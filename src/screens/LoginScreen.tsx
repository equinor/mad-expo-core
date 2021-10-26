import React from 'react';
import { makeRedirectUri, useAutoDiscovery } from 'expo-auth-session';
import { StyleSheet, Text, View } from 'react-native';
import LoginButton from '../components/authentication/LoginButton';
import AuthHelperMethods from '../components/authentication/authHelperMethods';
//import * as WebBrowser from 'expo-web-browser';

export default function LoginScreen(props: {
  environmentConstants: { CLIENT_ID: string };
  storageKey: string;
  navigation: any;
  bundleIdentifier: string;
}) {
  const discovery = useAutoDiscovery(AuthHelperMethods.AUTH_ISSUER);
  AuthHelperMethods.userHasValidToken(discovery, props.storageKey, props.environmentConstants.CLIENT_ID).then(bool => bool && props.navigation.replace("Root"));
  return (
    <View style={styles.container}>
      <LoginButton
        environmentConstants={props.environmentConstants}
        storageKey={props.storageKey}
        navigation={props.navigation}
        bundleIdentifier={props.bundleIdentifier}
      />
      <Text>
        {makeRedirectUri({
          native: `${props.bundleIdentifier}://auth`,
          scheme: `${props.bundleIdentifier}`
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
