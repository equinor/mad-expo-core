import * as React from 'react';
import AuthSession, { exchangeCodeAsync, makeRedirectUri, useAuthRequest, useAutoDiscovery } from 'expo-auth-session';
import { View } from 'react-native';
import Button from '../common/atoms/Button';
//import axios from 'axios';

//WebBrowser.maybeCompleteAuthSession();

export default function LoginButton(props:{environmentConstants:{CLIENT_ID:string, }, navigation: any}) {
    //const [token, setToken] = React.useState<string>('');
    // Endpoint
    const discovery = useAutoDiscovery('https://login.microsoftonline.com/statoilsrm.onmicrosoft.com/v2.0');
    // Request
    const [request, response, promptAsync] = useAuthRequest(
        {
            //responseType: ResponseType.Code,
            clientId: props.environmentConstants.CLIENT_ID,
            scopes: ['openid', 'profile', 'email'],
            redirectUri: makeRedirectUri({
                scheme: "mad-expo-template"
            }),
        },
        discovery
    );
    async function getUserInfo(token: string) {
        if (discovery?.userInfoEndpoint) {
            let returnValue:Object  ={};
            await fetch(discovery.userInfoEndpoint.toString(), {
                method: "GET",
                headers: new Headers({
                    Authorization: `Bearer ${token}`,
                })
            }).catch(e => console.error(e)).then(res => (res as Response).json().then((json:Object) => {
                console.log("RES:", json)
                returnValue = json;
            }))
            console.log("FETCH FINISHED")
            console.log("RETURN VALUE:", returnValue.toString())
            return returnValue
        }
        throw "discovery does not contain userInfoEndpoint";
    }

    React.useEffect(() => {
        console.log(response);
        if (response && response.type === 'success') {
            const getTokenAndUserInfo = async () => {
                console.log("Getting token")  
                let tokenRes: AuthSession.TokenResponse | void | null = discovery && await exchangeCodeAsync({
                    clientId: props.environmentConstants.CLIENT_ID,
                    code: response.params.code,
                    scopes: ['openid', 'profile', 'email'],
                    redirectUri: makeRedirectUri({
                        scheme: "mad-expo-template"
                    }),
                    extraParams: {
                        code_verifier: request?.codeVerifier || "",
                    }
                }, discovery).catch(e => console.log(e));
                if (tokenRes && tokenRes?.accessToken && tokenRes.accessToken !== null && tokenRes.accessToken !== "") {
                    return await getUserInfo(tokenRes.accessToken)
                }
                else {
                    //set an error
                    console.log("ERROR")
                }
                return "ERROR"
            };
            getTokenAndUserInfo().then(() => {props.navigation.navigate("Root")/*TODO save to local storage?*/});
        }
    }, [response]);

    return (
        <View>
        <Button
            disabled={!request}
            title="Login"
            onPress={() => {
                promptAsync()
            }}
        />
        </View>
    );
}