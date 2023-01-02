import { ScrollView, View } from 'react-native';
import { Button, Typography } from '../components/common';
import React, { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../stylesheets/colors';
import { getAccount, logout } from '../services/auth';
import type { MSALAccount } from 'react-native-msal';
import * as en from '../resources/language/en.json';
import * as no from '../resources/language/no.json';
const languages = {"en" : en, "no" : no};
const SettingsScreen = (props: {
  config: Array<{ icon: string; title: string; route: string }>;
  onLogout?: () => void;
  routeAfterLogout: string;
  backLabel?: string;
  navigation: any;
  languageCode?: string;
}) => {
  const langDict = languages[props.languageCode] ? languages[props.languageCode] : en;
  const [account, setAccount] = useState<MSALAccount>(null);
  useEffect(() => {
    props.navigation.setOptions({
      headerBackTitle: props.backLabel ? props.backLabel : langDict["settings.back"],
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
            languageCode={props.languageCode}
          />
        ))}
        <View style={{ paddingTop: 16 }}>
          <Typography bold>{langDict["settings.loggedInAs"]}</Typography>
          {account && <Typography>
            {account.username + "\n"}
          </Typography>}
          <Button
            title={langDict["settings.logOut"]}
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
  languageCode?: string;
}) => {
  const langDict = languages[props.languageCode] ? languages[props.languageCode] : en;
  return (
    <MaterialIcons.Button
      name={props.icon}
      onPress={() => props.navigation.navigate(props.route)}
      backgroundColor="transparent"
      color="#007079"
      underlayColor={Colors.GREEN_LIGHT}
      style={{ paddingVertical: 12, paddingLeft: 0
      }}
    >
      <Typography medium color="#007079">
        {langDict[props.title] ? langDict[props.title] : props.title}
      </Typography>
    </MaterialIcons.Button>
  );
};
export default SettingsScreen;
