import { ScrollView, TextInput, View } from 'react-native';
import { Button, Typography } from '../components/common';
import React, { useEffect } from 'react';
import * as Device from 'expo-device';
import * as Localization from 'expo-localization';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FeedbackScreen = (props: { loginStorageKey: string; navigation }) => {
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const userData: { [key: string]: string } = {
    'User': email,
    'Device brand': `${Device.brand}`,
    'Device id': `${Device.modelName}`,
    'Operating system': `${Device.osName} ${Device.osVersion}`,
    'Timezone': Localization.timezone,
    'Locale': Localization.locale,
    'Feedback': feedback,
  };

  useEffect(() => {
    AsyncStorage.getItem(props.loginStorageKey).then((str) =>
      setEmail(JSON.parse(str).user.email)
    );
  }, [props.loginStorageKey]);

  function sendFeedback() {
    //TODO send userData object
  }
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

        {Object.keys(userData)
          .filter((key) => key !== 'Feedback')
          .map((key) => {
            return <DataField key={key} itemKey={key} value={userData[key]} />;
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
          disabled={feedback === ''}
          onPress={sendFeedback}
        />
      </View>
    </ScrollView>
  );
};

const DataField = (props: { itemKey: string; value: string }) => (
  <View style={{ display: 'flex', flexDirection: 'row', padding: 8 }}>
    <Typography
      bold
      style={{ width: '50%' }}
    >{`- ${props.itemKey}:`}</Typography>
    <Typography style={{ width: '50%' }}>{props.value}</Typography>
  </View>
);
export default FeedbackScreen;
