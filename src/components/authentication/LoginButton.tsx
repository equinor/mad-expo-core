import { StyleSheet, View } from 'react-native';
import { isMsalConnected, msalLogin } from '../../services/auth';

import Button from '../common/atoms/Button';
import React from 'react';
import colors from '../../stylesheets/colors';

export default function LoginButton(props: {
  scope: string;
  navigation: any;
  mainRoute: string;
  eds?: boolean
}) {
  return (
    <View>
      <Button
        disabled={!isMsalConnected()}
        title="Login"
        onPress={async () => {
          msalLogin(props.scope).then(() =>
            props.navigation.navigate(props.mainRoute)
          );
        }}
        viewStyle={props.eds ? styles.buttonStyleEDS : styles.buttonStyle}
        textStyle={props.eds ? styles.textStyleEDS : undefined}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: colors.RED_LOGO,
  },
  buttonStyleEDS: {
    width: 241,
    height: 48,
    borderRadius: 4
  },
  textStyleEDS: {
    fontWeight: '400',
    fontSize: 16
  },
});
