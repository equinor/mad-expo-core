import React from 'react';
import { makeRedirectUri } from 'expo-auth-session';
import { StyleSheet, Text, View } from 'react-native';
import LoginButton from '../components/authentication/LoginButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import * as WebBrowser from 'expo-web-browser';

export default function LoginScreen(props: {
  environmentConstants: { CLIENT_ID: string };
  storageKey: string;
  navigation: any;
}) {
  console.log('AUTH!!: ');
  AsyncStorage.getItem(props.storageKey).then((res) => {
    if (res) {
      console.log('REDIRECT');
      //WebBrowser.maybeCompleteAuthSession();
      //props.navigation.replace("Root");
    }
    return (
      <View>
        <Text>{res}</Text>
      </View>
    );
  });
  return (
    <View style={styles.container}>
      <LoginButton
        environmentConstants={props.environmentConstants}
        storageKey={props.storageKey}
        navigation={props.navigation}
      />
      <Text>
        {makeRedirectUri({
          scheme: 'mad-expo-template',
        })}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
