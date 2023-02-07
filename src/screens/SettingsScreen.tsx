import { ScrollView, View } from 'react-native';
import { Button, Typography } from '../components/common';
import React, { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../stylesheets/colors';
import { getAccount, logout } from '../services/auth';
import type { MSALAccount } from 'react-native-msal';
import {
  DictionaryObject,
  dictionary,
  setLanguage,
} from '../resources/language/dictionary';

const SettingsScreen = (props: {
  config: Array<{ icon: string; title: string; route: string }>;
  onLogout?: () => void;
  routeAfterLogout: string;
  backLabel?: string;
  navigation: any;
  languageCode?: string;
}) => {
  props.languageCode ? setLanguage(props.languageCode) : setLanguage('en');
  const [account, setAccount] = useState<MSALAccount>(null);
  useEffect(() => {
    props.navigation.setOptions({
      headerBackTitle: props.backLabel
        ? props.backLabel
        : dictionary('settings.back'),
      headerTintColor: Colors.EQUINOR_PRIMARY,
    });
    getAccount()
      .then((acc) => {
        setAccount(acc);
      })
      .catch((error) => {
        throw error;
      });
  }, []);

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
            languageCode={props.languageCode}
          />
        ))}
        <View style={{ paddingTop: 16 }}>
          <Typography bold>{dictionary('settings.loggedInAs')}</Typography>
          {account && <Typography>{account.username + '\n'}</Typography>}
          <Button
            title={dictionary('settings.logOut')}
            onPress={() => {
              logout()
                .catch((e) => console.warn(e))
                .then(() => props.navigation.navigate(props.routeAfterLogout));
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
  languageCode?: string;
}) => {
  return (
    <MaterialIcons.Button
      name={props.icon}
      onPress={() => props.navigation.navigate(props.route)}
      backgroundColor="transparent"
      color="#007079"
      underlayColor={Colors.GREEN_LIGHT}
      style={{ paddingVertical: 12, paddingLeft: 0 }}
    >
      <Typography medium color="#007079">
        {dictionary(props.title as keyof DictionaryObject)}
      </Typography>
    </MaterialIcons.Button>
  );
};
export default SettingsScreen;
