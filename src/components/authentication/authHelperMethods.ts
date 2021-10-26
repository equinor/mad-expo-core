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
    const currentTime = new Date().getTime() / 1000;
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

  getSavedData: async (localStorageKey: string): Promise<{ tokenRes: TokenResponse, user: any }> => {
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
    let response = discovery?.endSessionEndpoint ? await fetch(signOutURI, {
      method: 'GET',
    }).then(res => res.status === 200) : null;
    return response;
  },

  userHasValidToken: async (discovery: DiscoveryDocument, storageKey: string, clientId: string): Promise<boolean> => {
    return AsyncStorage.getItem(storageKey).then((res) => {
      if (res != null && res != "null") {
        const json: { tokenRes: TokenResponse, user: any } = JSON.parse(res);
        if (json?.tokenRes) {
          const tokenRes: TokenResponse = json.tokenRes;
          console.log("TOKEN EXPIRES AT: ", tokenRes.issuedAt + tokenRes.expiresIn);
          console.log("TOKEN EXPIRES AT REAL DATE: ", new Date((tokenRes.issuedAt + tokenRes.expiresIn) * 1000));
          console.log("CURRENT TIME:", new Date().getTime() / 1000);
          console.log("CURRENT TIME REAL DATE:", new Date());
          if (AuthHelperMethods.isTokenExpired(tokenRes)) {
            console.log("Token expired, refreshing token")
            return AuthHelperMethods.refreshToken(clientId, discovery, tokenRes).then(refreshTokenResponse => {
              console.log("Refresh token response: ", refreshTokenResponse);
              if (refreshTokenResponse && refreshTokenResponse.accessToken) {
                AsyncStorage.setItem(storageKey, JSON.stringify(refreshTokenResponse));
                return true;
              }
              return false;
              // TODO check if the token is still valid before sending the user to the next page
              //WebBrowser.maybeCompleteAuthSession();
            })
          } else {
            return true;
          }
        }
      }
      return false;
    })
  }
};

export default AuthHelperMethods;
