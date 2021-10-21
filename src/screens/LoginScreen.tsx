import React from 'react';
import { makeRedirectUri, TokenResponse, useAutoDiscovery } from 'expo-auth-session';
import { StyleSheet, Text, View } from 'react-native';
import LoginButton from '../components/authentication/LoginButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthHelperMethods from '../components/authentication/authHelperMethods';
//import * as WebBrowser from 'expo-web-browser';

export default function LoginScreen(props: {
  environmentConstants: { CLIENT_ID: string };
  storageKey: string;
  navigation: any;
  bundleIdentifier: string;
}) {
  const discovery = useAutoDiscovery(AuthHelperMethods.AUTH_ISSUER);
  AsyncStorage.getItem(props.storageKey).then((res) => {
    if (res != null && res != "null") {
      console.log("RES:", res);
      const json: {tokenRes: TokenResponse, user: any} = JSON.parse(res);
      if (json?.tokenRes) {
        const tokenRes: TokenResponse = json.tokenRes;
        console.log("TOKEN EXPIRES AT: ", tokenRes.issuedAt+tokenRes.expiresIn);
        console.log("TOKEN EXPIRES AT REAL DATE: ", new Date((tokenRes.issuedAt+tokenRes.expiresIn)*1000));
        console.log("CURRENT TIME:", new Date().getTime()/1000);
        console.log("CURRENT TIME REAL DATE:", new Date());
        if (AuthHelperMethods.isTokenExpired(tokenRes)) {
          console.log("Token expired, refreshing token")
          AuthHelperMethods.refreshToken(props.environmentConstants.CLIENT_ID, discovery, tokenRes).then(refreshTokenResponse => {
            console.log("Refresh token response: ", refreshTokenResponse);
            if (refreshTokenResponse && refreshTokenResponse.accessToken) {
              AsyncStorage.setItem(props.storageKey, JSON.stringify(refreshTokenResponse));
              props.navigation.replace("Root");
            }
            // TODO check if the token is still valid before sending the user to the next page
            //WebBrowser.maybeCompleteAuthSession();
          })
        } else {
          props.navigation.replace("Root");
        }
      }
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
