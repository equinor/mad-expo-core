import * as Device from 'expo-device';

import { Button, Typography } from '../components/common';
import React, { useEffect } from 'react';
import { ScrollView, TextInput, View } from 'react-native';
import { authenticateSilently, getAccount } from '../services/auth';

import Colors from '../stylesheets/colors';
import type { MSALAccount } from 'react-native-msal';
import { useState } from 'react';

const FeedbackScreen = (props: {
  locale: string;
  timezone: string;
  scope: string;
  apiBaseUrl: string;
}) => {
  const [feedback, setFeedback] = useState('');
  const [isBusy, setIsBusy] = useState(false);
  const [account, setAccount] = useState<MSALAccount>(null);
  useEffect(() => {
    getAccount().then((acc) => {
      setAccount(acc);
    });
  }, []);
  const userData: { [key: string]: string } = {
    'User': `${account?.username}`,
    'Device brand': `${Device.brand}`,
    'Device': `${Device.modelName}`,
    'Operating system': `${Device.osName} ${Device.osVersion}`,
    'Timezone': `${props?.timezone}`,
    'Locale': `${props?.locale}`,
    'Feedback': feedback,
  };
  const sendFeedback = (data) => {
    setIsBusy(true);
    // Product, User, Msg, SystemMsg
    authenticateSilently(props.scope).then((r) =>
      fetch(`${props.apiBaseUrl}/feedback`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${r.accessToken}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            setIsBusy(false);
            setFeedback('');
          }
        })
        .catch((error) => {
          setIsBusy(false);
          console.error(error);
        })
    );
  };

  return (
    <ScrollView>
      <View style={{ padding: 24 }}>
        <Typography variant="h1" style={{ marginBottom: 8 }}>
          Have some feedback?
        </Typography>
        <Typography medium>
          {
            'We are collecting some information about your device as part of the feedback-process. By submitting you agree to share the following information:\n\n'
          }
        </Typography>

        {Object.entries(userData)
          .filter(([key]) => key !== 'Feedback')
          .map(([key, value]) => {
            return <DataField key={key} itemKey={key} value={value} />;
          })}
        <TextInput
          style={{
            height: 200,
            width: '100%',
            backgroundColor: 'white',
            padding: 16,
            paddingTop: 16,
            marginVertical: 16,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: 'gray',
          }}
          onChangeText={(e) => setFeedback(e.toString())}
          multiline
          placeholder="Type your feedback here"
          textAlignVertical={'top'}
        >
          <Typography medium>{feedback}</Typography>
        </TextInput>
        <Button
          title="Send"
          viewStyle={{ width: '100%' }}
          disabled={feedback === '' || isBusy}
          onPress={() => sendFeedback(userData)}
        />
      </View>
    </ScrollView>
  );
};

const DataField = (props: { itemKey: string; value: string }) => (
  <View
    style={{
      display: 'flex',
      flexDirection: 'row',
      padding: 8,
      borderColor: Colors.BORDER,
      borderBottomWidth: 1,
      marginVertical: 8,
    }}
  >
    <Typography style={{ width: '50%' }}>{`${props.itemKey}:`}</Typography>
    <Typography style={{ width: '50%' }}>{props.value}</Typography>
  </View>
);
export default FeedbackScreen;
