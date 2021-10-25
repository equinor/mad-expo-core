import { ScrollView, View } from 'react-native';
import { Button, Typography } from '../components/common';
import React, { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../stylesheets/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAutoDiscovery } from 'expo-auth-session';
import AuthHelperMethods from '../components/authentication/authHelperMethods';

const SettingsScreen = (props: {
  config: Array<{ icon: string; title: string; route: string }>;
  loginStorageKey: string;
  bundleIdentifier: string;
  navigation: any;
}) => {
  const [authData, setAuthData] = useState(null);
  const discovery = useAutoDiscovery(AuthHelperMethods.AUTH_ISSUER);
  const config = props.config;
  useEffect(() => {
    AsyncStorage.getItem(props.loginStorageKey).then((str) =>
      setAuthData(JSON.parse(str))
    );
  }, [props.loginStorageKey]);
  return (
    <ScrollView>
      <View style={{ padding: 24 }}>
        {config.map((item) => (
          <Setting
            icon={item.icon}
            title={item.title}
            route={item.route}
            navigation={props.navigation}
          />
        ))}
        <View style={{ paddingTop: 16 }}>
          <Typography bold>Signed in as:</Typography>
          <Typography>
            {authData?.user &&
              `${authData.user.given_name} ${authData.user.family_name}`}
          </Typography>
          <Typography>{authData?.user && `${authData.user.email}`}</Typography>
          <Button
            title="Sign out"
            onPress={() => {
              AuthHelperMethods.getSavedData(props.loginStorageKey).then(
                () => {
                  AuthHelperMethods.signOut(
                    discovery,
                    props.bundleIdentifier
                  ).then((success) => {
                    if (success)
                      AsyncStorage.removeItem(props.loginStorageKey).then(() =>
                        props.navigation.replace('Login')
                      );
                  });
                }
              );
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const Setting = (props: {
  icon;
  title: string;
  route: string;
  navigation: any;
}) => {
  return (
    <MaterialIcons.Button
      name={props.icon}
      onPress={() => props.navigation.navigate(props.route)}
      backgroundColor="transparent"
      color="#007079"
      underlayColor={Colors.GREEN_LIGHT}
      style={{ padding: 12 }}
    >
      <Typography medium color="#007079">
        {props.title}
      </Typography>
    </MaterialIcons.Button>
  );
};
export default SettingsScreen;
