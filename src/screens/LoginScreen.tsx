import { Image, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';

import LoginButton from '../components/authentication/LoginButton';
import { authenticateSilently } from '../services/auth';
import colors from '../stylesheets/colors';
import equinorLogo from '../resources/images/equinor_logo.png';
import { msalIsConnected } from '../services/auth';

//import * as WebBrowser from 'expo-web-browser';

export default function LoginScreen(props: {
  scope: string;
  navigation: any;
  bundleIdentifier: string;
  mainRoute: string;
  logo: any;
}) {
  useEffect(() => {
    msalIsConnected() &&
      authenticateSilently(props.scope)
        .catch((e) => console.warn(e))
        .then((res) => res && props.navigation.navigate(props.mainRoute));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.splashTop}>
        <Image source={equinorLogo} />
      </View>
      <View style={styles.splashBottom}>
        <View style={styles.splashAppLogo}>
          <Image source={this.props.logo} />
        </View>
        <View style={styles.splashAction}>
          <LoginButton
            scope={props.scope}
            navigation={props.navigation}
            mainRoute={props.mainRoute}
          />
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
});
