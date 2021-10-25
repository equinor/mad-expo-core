import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  TokenResponse,
  refreshAsync,
  DiscoveryDocument,
  makeRedirectUri
} from 'expo-auth-session';

const AuthHelperMethods = {
  AUTH_ISSUER:
    'https://login.microsoftonline.com/statoilsrm.onmicrosoft.com/v2.0',

  isTokenExpired: (tokenRes: TokenResponse): boolean => {
    const currentTime = new Date().getTime()/1000;
    return (tokenRes.issuedAt + tokenRes.expiresIn <= currentTime)
  },

  refreshToken: async (
    clientID: string,
    discovery: DiscoveryDocument,
    tokenRes: TokenResponse
  ): Promise<TokenResponse | null | void> => {
    let response = discovery?.tokenEndpoint ? await refreshAsync(
      {
        clientId: clientID,
        scopes: ['openid', 'profile', 'email', 'offline_access'],
        refreshToken: tokenRes.refreshToken,
      },
      discovery
    ).catch(e => console.log(e)) : null;
    console.log("refreshTokenResponse:", response);
    return response;
  },

  getSavedData: async (localStorageKey: string): Promise<{tokenRes: TokenResponse, user:any}> => {
    const item = await AsyncStorage.getItem(localStorageKey);
    return JSON.parse(item);
  },

  signOut: async (discovery: DiscoveryDocument,
    bundleIdentifier: string) => {
    const endSessionEndpoint = discovery?.endSessionEndpoint
    const signOutURI = `${endSessionEndpoint}?post_logout_redirect_uri=${makeRedirectUri({
      native: `${bundleIdentifier}://auth`,
      scheme: `${bundleIdentifier}`
    })}`;
    let response = discovery?.endSessionEndpoint ? await fetch(signOutURI,{
      method: 'GET',
    }).then(res => res.status === 200) : null;
    return response;
  }
};

export default AuthHelperMethods;
