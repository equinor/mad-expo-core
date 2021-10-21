import React, {useEffect} from 'react';
import AuthSession, {
  exchangeCodeAsync,
  makeRedirectUri,
  useAuthRequest,
  useAutoDiscovery,
} from 'expo-auth-session';
import { View } from 'react-native';
import Button from '../common/atoms/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from 'expo-web-browser';
import AuthHelperMethods from './authHelperMethods';

export default function LoginButton(props: {
  environmentConstants: { CLIENT_ID: string };
  storageKey: string;
  navigation: any;
  bundleIdentifier: string 
}) {
  //const [token, setToken] = React.useState<string>('');
  // Endpoint
  const discovery = useAutoDiscovery(
    AuthHelperMethods.AUTH_ISSUER
  );
  // Request
  const [request, response, promptAsync] = useAuthRequest(
    {
      //responseType: ResponseType.Code,
      clientId: props.environmentConstants.CLIENT_ID,
      scopes: ['openid', 'profile', 'email', 'offline_access'],
      redirectUri: makeRedirectUri({
        native: `${props.bundleIdentifier}://auth`,
        scheme: `${props.bundleIdentifier}`
      }),
    },
    discovery
  );

  useEffect(() => {
    async function getUserInfo(token: string) {
      if (discovery?.userInfoEndpoint) {
        let returnValue: Object = {};
        await fetch(discovery.userInfoEndpoint.toString(), {
          method: 'GET',
          headers: new Headers({
            Authorization: `Bearer ${token}`,
          }),
        })
          .catch((e) => console.error(e))
          .then((res) =>
            (res as Response).json().then((json: Object) => {
              console.log('RES:', json);
              returnValue = json;
            })
          );
        return returnValue;
      }
      throw 'discovery does not contain userInfoEndpoint';
    }
    if (response && response.type === 'success') {
      const getTokenAndUserInfo = async () => {
        let tokenRes: AuthSession.TokenResponse | void | null =
          discovery &&
          (await exchangeCodeAsync(
            {
              clientId: props.environmentConstants.CLIENT_ID,
              code: response.params.code,
              scopes: ['openid', 'profile', 'email', 'offline_access'],
              redirectUri: makeRedirectUri({
                native: `${props.bundleIdentifier}://auth`,
                scheme: `${props.bundleIdentifier}`
              }),
              extraParams: {
                code_verifier: request?.codeVerifier || '',
              },
            },
            discovery
          ).catch((e) => console.log(e)));
        if (
          tokenRes &&
          tokenRes?.accessToken &&
          tokenRes.accessToken !== null &&
          tokenRes.accessToken !== ''
        ) {
          return {
            tokenRes: tokenRes,
            user: await getUserInfo(tokenRes.accessToken),
          };
        } else {
          //set an error
          console.log('ERROR');
        }
        return 'ERROR';
      };
      getTokenAndUserInfo().then((res) => {
        AsyncStorage.setItem(props.storageKey, JSON.stringify(res)).then(() => {
          WebBrowser.maybeCompleteAuthSession();
          props.navigation.replace('Root');
        });
      });
    }
  }, [response, discovery, props, request?.codeVerifier]);

  return (
    <View>
      <Button
        disabled={!request}
        title="Login"
        onPress={() => {
          promptAsync();
        }}
      />
    </View>
  );
}
