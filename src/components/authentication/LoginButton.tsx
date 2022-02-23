import React from 'react';
import { View } from 'react-native';
import Button from '../common/atoms/Button';
import { msalIsConnected, msalLogin } from '../../services/auth';


export default function LoginButton(props: {
  scope: string;
  navigation: any;
}) {
  
  return (
    <View>
      <Button
        disabled={!msalIsConnected()}
        title="Login"
        onPress={async () => {
          msalLogin(props.scope).then(() => props.navigation.navigate("Root"))
        }}
      />
    </View>
  );
}
