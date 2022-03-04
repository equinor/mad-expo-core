import { StyleSheet, View } from 'react-native';
import { msalIsConnected, msalLogin } from '../../services/auth';

import Button from '../common/atoms/Button';
import React from 'react';
import colors from 'src/stylesheets/colors';

export default function LoginButton(props: {
  scope: string;
  navigation: any;
  mainRoute: string;
}) {
  return (
    <View>
      <Button
        disabled={!msalIsConnected()}
        title="Login"
        onPress={async () => {
          msalLogin(props.scope).then(() =>
            props.navigation.navigate(props.mainRoute)
          );
        }}
        viewStyle={styles.buttonStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: colors.RED_LOGO,
  },
  buttonStyleDisabled: {
    backgroundColor: colors.GRAY_3,
  },
  buttonTextStyleDisabled: {},
});
