import { ScrollView, View } from 'react-native';
import { Button, Typography } from '../components/common';
import React, { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../stylesheets/colors';
import { getAccount, logout } from '../services/auth';
import type { MSALAccount } from 'react-native-msal';

const SettingsScreen = (props: {
  config: Array<{ icon: string; title: string; route: string }>;
  onLogout?: () => void;
  routeAfterLogout: string;
  backLabel?: string;
  navigation: any;
  languageDict: any;
}) => {
  const [account, setAccount] = useState<MSALAccount>(null);
  useEffect(() => {
    props.navigation.setOptions({
      headerBackTitle: props.backLabel ?? props.languageDict["settings.back"],
      headerTintColor: Colors.EQUINOR_PRIMARY
    });
    getAccount().then((acc) => {
      setAccount(acc);
    })
  }, [])



  const config = props.config;
  return (
    <ScrollView>
      <View style={{ padding: 24 }}>
        {config.map((item, index) => (
          <Setting
            key={index}
            icon={item.icon}
            title={item.title}
            route={item.route}
            navigation={props.navigation}
            languageDict={props.languageDict}
          />
        ))}
        <View style={{ paddingTop: 16 }}>
          <Typography bold>{props.languageDict["settings.loggedInAs"]}</Typography>
          {account && <Typography>
            {account.username + "\n"}
          </Typography>}
          <Button
            title={props.languageDict["settings.logOut"]}
            onPress={() => {
              logout().catch(e => console.warn(e)).then(() => props.navigation.navigate(props.routeAfterLogout))
              if (props.onLogout) {
                props.onLogout();
              }
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
  languageDict: any
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
        {props.title === "Feedback" ? props.languageDict["feedback.title"]: props.title}
      </Typography>
    </MaterialIcons.Button>
  );
};
export default SettingsScreen;
