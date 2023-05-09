import { StyleSheet, View } from 'react-native';
import {
  fetchDepartmentId,
  IClaims,
  isMsalConnected,
  msalLogin,
} from '../../services/auth';

import Button from '../common/atoms/Button';
import React from 'react';
import colors from '../../stylesheets/colors';
import {
  metricKeys,
  metricStatus,
  setUsername,
  track,
} from '../../services/appInsights';
import type { MSALAccount } from 'react-native-msal';
import { setDepartmentId } from 'src/services/departmentIdStorage';

export default function LoginButton(props: {
  mainRoute: string;
  navigation: any;
  scopes: string[];
  onLoginSuccessful?: (account: MSALAccount) => void;
  eds?: boolean;
}) {
  return (
    <View>
      <Button
        disabled={!isMsalConnected()}
        title="Log in"
        onPress={async () => {
          track(metricKeys.AUTHENTICATION, metricStatus.STARTED);
          msalLogin(props.scopes)
            .then(async (res) => {
              if (props.onLoginSuccessful) props.onLoginSuccessful(res);
              const objectId = (res.claims as IClaims)?.oid;
              setUsername(res.username, objectId);
              track(metricKeys.AUTHENTICATION, metricStatus.SUCCESS);
              props.navigation.navigate(props.mainRoute);
            })
            .catch((e: Error) => {
              console.warn(e);
              track(metricKeys.AUTHENTICATION, metricStatus.FAILED, e.message);
            });
        }}
        viewStyle={props.eds ? styles.buttonStyleEDS : styles.buttonStyle}
        textStyle={props.eds ? styles.textStyleEDS : undefined}
        busy={false}
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
    borderRadius: 4,
  },
  textStyleEDS: {
    fontWeight: '400',
    fontSize: 16,
  },
});
