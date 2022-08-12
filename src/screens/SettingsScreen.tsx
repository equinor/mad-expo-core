import { ScrollView, View } from 'react-native';
import { Button, Typography } from '../components/common';
import React, { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../stylesheets/colors';
import { getAccount, logout } from '../services/auth';
import type { MSALAccount } from 'react-native-msal';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = (props: {
  config: Array<{ icon: string; title: string; route: string }>;
  onLogout?: () => void;
  routeAfterLogout: string;
  backLabel?: string;
}) => {
  const [account, setAccount] = useState<MSALAccount>(null);
  const navigation = useNavigation();
  useEffect(() => {
    getAccount().then((acc) => {
      console.log(acc.claims);
      setAccount(acc);
    })
  }, [])

  navigation.setOptions({
    headerBackTitle: props.backLabel ?? "Back",
    headerTintColor: Colors.EQUINOR_PRIMARY
  })

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
          />
        ))}
        <View style={{ paddingTop: 16 }}>
          <Typography bold>Signed in as:</Typography>
          {account && <Typography>
            {account.username}
          </Typography>}
          <Button
            title="Sign out"
            onPress={() => {
              logout().catch(e => console.warn(e)).then(() => navigation.navigate({key: props.routeAfterLogout}))
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
}) => {
  const navigation = useNavigation()
  return (
    <MaterialIcons.Button
      name={props.icon}
      onPress={() => navigation.navigate({key: props.route})}
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
