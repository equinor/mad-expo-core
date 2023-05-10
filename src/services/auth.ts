import PublicClientApplication, {
  MSALAccount,
  MSALResult,
  MSALSilentParams,
} from 'react-native-msal';
import type { MSALConfiguration } from 'react-native-msal';
import { setDepartmentId } from './departmentIdStorage';
import ConfigStore from './configStore';

export let pca: PublicClientApplication | null = null;

export async function msalInit(
  clientId: string,
  redirectUri: string,
  authority = 'https://login.microsoftonline.com/statoilsrm.onmicrosoft.com/'
) {
  const config: MSALConfiguration = {
    auth: {
      authority,
      clientId,
      redirectUri,
    },
    cache: { cacheLocation: 'localStorage' },
  };
  pca = new PublicClientApplication(config);
  await pca.init().catch((e) => console.warn(e));
}

export function isMsalConnected(): boolean {
  return !!pca;
}

export async function msalLogin(scopes: string[]) {
  if (!pca) {
    throw new Error('Unable to authenticate, pca is null');
  }
  const result: MSALResult | undefined = await pca.acquireToken({
    scopes,
  });
  return { ...result?.account, userId: result?.account.username };
}

export async function getAccount() {
  if (!pca) {
    throw new Error('Unable to authenticate, pca is null');
  }
  const accounts: MSALAccount[] = await pca.getAccounts();

  if (accounts.length > 0) {
    const account = accounts[0];
    return account;
  }

  return null;
}
export async function authenticateSilently(scopes: string[]) {
  if (!pca) {
    throw new Error('Unable to authenticate, pca is null');
  }
  console.log('Starting authenticateSilently...');
  const getDepartmentID = ConfigStore.getInstance().getDepartmentID;

  if (getDepartmentID) {
    scopes = ['https://graph.microsoft.com/User.Read'];
  }

  const accounts: MSALAccount[] | void = await pca
    .getAccounts()
    .catch((e) => {
      console.warn('Error getting accounts:', e);
    })
    .then((accounts) => {
      console.log('Accounts retrieved:', accounts);
      return accounts;
    });

  if (accounts && accounts.length > 0) {
    const account = accounts[0];
    console.log('Selected account:', account);

    const params: MSALSilentParams = {
      account: accounts[0],
      scopes,
      forceRefresh: false,
    };
    console.log('MSALSilentParams:', params);

    const result: MSALResult | undefined | void = await pca
      .acquireTokenSilent(params)
      .catch((e) => {
        console.log('Error while fetching token silently', e);
      })
      .then((res) => {
        console.log('Token silently fetched:', res);
        return res;
      });

    if (!result) {
      console.log('No result, returning null...');
      return null;
    }

    const authResult = { ...result, userId: account.username };
    console.log('Authentication result:', authResult);

    if (getDepartmentID) {
      console.log('Fetching department ID...');

      try {
        const response = await fetch(
          'https://graph.microsoft.com/v1.0/me?$select=onPremisesExtensionAttributes',
          {
            headers: {
              Authorization: `Bearer ${authResult.accessToken}`,
            },
          }
        );
        const data = await response.json();
        console.log('Fetched data:', data);

        const attribute =
          data.onPremisesExtensionAttributes.extensionAttribute8;
        const number = attribute.split(':')[2];
        console.log('Department ID:', number);

        await setDepartmentId(number);
        console.log('Department ID stored successfully.');
      } catch (error) {
        console.error('Error fetching the number:', error);
      }
    }

    return authResult;
  }

  throw Error("No refresh token, can't authenticate silently");
}

export const errorCodes = {};

export async function logout() {
  if (!pca) {
    throw new Error('Unable to logout, pca is null');
  }
  const accounts: MSALAccount[] = await pca.getAccounts();

  if (accounts.length > 0) {
    const success: boolean = await pca.removeAccount(accounts[0]);
    return success;
  }

  return false;
}
export interface IClaims {
  alg: string;
  aud: string;
  exp: number;
  iat: number;
  iss: string;
  kid: string;
  name: string;
  nbf: number;
  oid: string;
  preferred_username: string;
  rh: string;
  sub: string;
  tid: string;
  typ: string;
  uti: string;
  ver: string;
}
