import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';

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
  useEffect(() => {
    isMsalConnected() &&
      authenticateSilently(props.scopes)
        .catch((e) => console.warn(e))
        .then((res) => res && props.navigation.navigate(props.mainRoute));
  }, []);
  if (props.eds && props.title) {
    return (
      <View style={stylesEDS.container}>
        <Typography variant="h1" bold color={'#3D3D3D'}>{props.title}</Typography>
        <Image
          source={props.logo}
          resizeMode="contain"
          style={{ height: 400, width: 400 }}
        />
        <LoginButton
          scopes={props.scopes}
          navigation={props.navigation}
          mainRoute={props.mainRoute}
          eds
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.splashTop}>
        <Image source={equinorLogo} />
      </View>
      <View style={styles.splashBottom}>
        <View style={styles.splashAppLogo}>
          <Image source={props.logo} />
        </View>
        <View style={styles.splashAction}>
          <LoginButton
            scopes={props.scopes}
            navigation={props.navigation}
            mainRoute={props.mainRoute}
          />
             {props.showDemoButton && (
            <Button
              disabled={!isMsalConnected()}
              title="Demo"
              onPress={() => {if (props.onDemoPress) props.onDemoPress()}}
              viewStyle={props.eds ? styles.buttonStyleEDS : styles.buttonStyle}
            />
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
  buttonStyle: {
    backgroundColor: colors.EQUINOR_PRIMARY,
    flex: 3,
    marginTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyleEDS: {
    width: 241,
    height: 48,
    borderRadius: 4,
  },
  splashAction: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
