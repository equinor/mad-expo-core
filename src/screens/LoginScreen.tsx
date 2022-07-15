import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  View,
  Pressable,
} from 'react-native';
import React, { useEffect, useState } from 'react';

import LoginButton from '../components/authentication/LoginButton';
import { authenticateSilently } from '../services/auth';
import colors from '../stylesheets/colors';
import equinorLogo from '../resources/images/equinor_logo.png';
import { isMsalConnected } from '../services/auth';
import { Typography, Button } from '../components/common';

export default function LoginScreen(props: {
  bundleIdentifier: string;
  logo: ImageSourcePropType;
  mainRoute: string;
  navigation: any;
  scopes: string[];
  eds?: boolean;
  title?: string;
  showDemoButton?: boolean;
  onDemoPress?: () => void;
}) {
  const [logoPressCount, setLogoPressCount] = useState(0);
  useEffect(() => {
    isMsalConnected() &&
      authenticateSilently(props.scopes)
        .catch((e) => console.warn(e))
        .then((res) => res && props.navigation.navigate(props.mainRoute));
  }, []);

  const renderLoginButton = () => {
    return <LoginButton
    scopes={props.scopes}
    navigation={props.navigation}
    mainRoute={props.mainRoute}
    eds
  />
  }

  const renderDemoButton = () => {
    return <Button
    title="Demo"
    onPress={() => {
      if (props.onDemoPress) props.onDemoPress();
    }}
    viewStyle={{ marginTop: 8 }}
    />
  }
  
  if (props.eds && props.title) {
    return (
      <View style={stylesEDS.container}>
        <Typography variant="h1" bold color={'#3D3D3D'}>
          {props.title}
        </Typography>
        <Pressable
          onPress={() => {{
            setLogoPressCount((prevLogoPressCount) => prevLogoPressCount + 1);
          }}}
        >
          <Image
            source={props.logo}
            resizeMode="contain"
            style={styles.logo}
          />
        </Pressable>

        <View>
          {renderLoginButton()}
          {props.showDemoButton && logoPressCount >= 5 && (
           renderDemoButton()
          )}
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.splashTop}>
        <Image 
          source={equinorLogo} 
          resizeMode="contain"
          style={styles.logo}/>
      </View>
      <View style={styles.splashBottom}>
        <Pressable style={styles.splashAppLogo} onPress={() => {
          setLogoPressCount((prevlogoPressCount) => prevlogoPressCount + 1);
        }
          }>
          <Image 
            source={props.logo} 
            resizeMode="contain"
            style={styles.logo}/>
        </Pressable>
        <View style={styles.splashAction}>
        {renderLoginButton()}
          {props.showDemoButton && logoPressCount >= 5 && (
            renderDemoButton()
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  splashTop: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  splashBottom: {
    flex: 3,
    backgroundColor: colors.PINK_BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashAppLogo: {
    flex: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashAction: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 400,
    height: 400
  }
});

const stylesEDS = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 72,
  },
});
