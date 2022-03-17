import {
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { getAccount, logout } from '../services/auth';

import Colors from '../stylesheets/colors';
import type { MSALAccount } from 'react-native-msal';
import { MaterialIcons } from '@expo/vector-icons';
import { Typography } from '../components/common';

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  sectionMarginTop: {
    marginTop: 10,
  },
  sectionSeparator: {
    borderColor: Colors.BORDER,
    borderBottomWidth: 1,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    alignItems: 'center',
    borderColor: Colors.BORDER,
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  sectionHeaderContainer: {
    height: 30,
  },
  itemText: {
    lineHeight: 30,
    fontSize: 16,
    color: Colors.EQUINOR_PRIMARY,
    alignSelf: 'flex-start',
  },
  textStyle: {
    color: Colors.GRAY_1,
    fontSize: 16,
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
  },
  viewStyle: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    justifyContent: 'flex-start',
  },
  clearTextStyle: {
    color: Colors.RED,
  },
});

const SettingsScreen = (props: {
  config: Array<{ icon: string; title: string; route: string }>;
  navigation: any;
}) => {
  const [account, setAccount] = useState<MSALAccount>(null);
  useEffect(() => {
    getAccount().then((acc) => {
      setAccount(acc);
    });
  }, []);

  const config = props.config;
  return (
    <ScrollView style={[styles.page, styles.sectionMarginTop]}>
      <View style={{ flex: 1 }}>
        {config.map((item, index) => (
          <Setting
            key={index}
            icon={item.icon}
            title={item.title}
            route={item.route}
            navigation={props.navigation}
          />
        ))}
        {account && (
          <View
            style={[
              styles.sectionSeparator,
              styles.itemContainer,
              styles.sectionMarginTop,
            ]}
          >
            <Typography>Logged in as: {account.username}</Typography>
          </View>
        )}
        <View
          style={[
            styles.sectionSeparator,
            styles.sectionMarginTop,
            { backgroundColor: 'white', padding: 5 },
          ]}
        >
          <Button
            title="Log out"
            color={Colors.RED}
            onPress={() => {
              logout()
                .catch((e) => console.warn(e))
                .then(() => props.navigation.navigate('Login'));
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
    <TouchableOpacity onPress={() => props.navigation.navigate(props.route)}>
      <View
        style={[
          styles.sectionSeparator,
          styles.itemContainer,
          { flexDirection: 'row-reverse' },
        ]}
      >
        <MaterialIcons
          name={props.icon}
          backgroundColor="transparent"
          color="#007079"
        ></MaterialIcons>
        <Typography medium color="#007079" size={18} style={{ lineHeight: 24 }}>
          {props.title}
        </Typography>
      </View>
    </TouchableOpacity>
  );
};
export default SettingsScreen;
