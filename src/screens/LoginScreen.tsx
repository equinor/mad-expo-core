import React, { useEffect } from 'react';
import { makeRedirectUri } from 'expo-auth-session';
import { StyleSheet, Text, View } from 'react-native';
import LoginButton from '../components/authentication/LoginButton';
import { msalIsConnected } from '../services/auth';
import { authenticateSilently } from '../services/auth';
//import * as WebBrowser from 'expo-web-browser';

export default function LoginScreen(props: {
  scope: string;
  navigation: any;
  bundleIdentifier: string;
}) {
  useEffect(() => {
    msalIsConnected() &&
      authenticateSilently(props.scope)
        .catch((e) => console.warn(e))
        .then((res) => res && props.navigation.navigate('Root'));
  }, []);
  return (
    <View style={styles.container}>
      <LoginButton scope={props.scope} navigation={props.navigation} />
      <Text>
        {makeRedirectUri({
          native: `msauth.${props.bundleIdentifier}://auth`,
          scheme: `msauth.${props.bundleIdentifier}`,
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
