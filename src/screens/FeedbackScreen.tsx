import * as Device from 'expo-device';

import { Button, Typography } from '../components/common';
import React, { useEffect } from 'react';
import {
  InputAccessoryView,
  Keyboard,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { authenticateSilently, getAccount } from '../services/auth';

import { Banner } from 'mad-expo-core';
import Colors from '../stylesheets/colors';
import type { MSALAccount } from 'react-native-msal';
import { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { dictionary, setLanguage } from '../resources/language/dictionary';

const styles = StyleSheet.create({
  textStyle: {
    color: Colors.WHITE,
    fontSize: 16,
  },
  viewErrorStyle: {
    padding: 12,
    paddingTop: 24,
    backgroundColor: Colors.RED,
  },
  viewSuccessStyle: {
    padding: 12,
    paddingTop: 24,
    backgroundColor: Colors.EQUINOR_PRIMARY,
  },
});

const FeedbackScreen = (props: {
  locale: string;
  timezone: string;
  scopes: string[];
  apiBaseUrl: string;
  product: string;
  languageCode?: string;
}) => {
  props.languageCode ? setLanguage(props.languageCode) : setLanguage('en');
  const [feedback, setFeedback] = useState('');
  const [bannerMessage, setBannerMessage] = useState('');
  const [error, setError] = useState('');
  const [isBusy, setIsBusy] = useState(false);
  const [account, setAccount] = useState<MSALAccount>(null);
  useEffect(() => {
    getAccount().then((acc) => {
      setAccount(acc);
    });
  }, []);
  const userData: { [key: string]: string } = {
    [dictionary('feedback.user')]: `${account?.username.substring(
      0,
      account?.username.indexOf('@')
    )}`,
    [dictionary('feedback.deviceBrand')]: `${
      Platform.OS === 'web' ? 'web' : Device.brand
    }`,
    [dictionary('feedback.device')]: `${
      Platform.OS === 'web' ? 'web' : Device.modelName
    } `,
    [dictionary('feedback.OS')]: `${Device.osName} ${Device.osVersion}`,
    [dictionary('feedback.timezone')]: `${props?.timezone}`,
    [dictionary('feedback.locale')]: `${props?.locale}`,
    Feedback: feedback,
  };
  const feedbackInputAccessoryViewID = 'feedbackInput';

  interface feedbackData {
    product: string;
    user: string;
    msg: string;
    systemMsg: string;
  }

  const sendFeedback = (data: feedbackData) => {
    setIsBusy(true);
    authenticateSilently(props.scopes).then((r) =>
      fetch(`${props.apiBaseUrl}/feedback`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${r?.accessToken}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            setIsBusy(false);
            setFeedback('');
            setBannerMessage('Thank you! Feedback sent.');
            setTimeout(() => setBannerMessage(''), 2000);
          }
        })
        .catch((error) => {
          setIsBusy(false);
          setError(error);
          console.error(error);
          setBannerMessage('Error sending your feedback.');
        })
    );
  };

  const getSystemMessage = (): string => {
    let systemMsg = '\n\n';
    const feedbackItems = [
      dictionary('feedback.user'),
      dictionary('feedback.deviceBrand'),
      dictionary('feedback.device'),
      dictionary('feedback.OS'),
      dictionary('feedback.timezone'),
      dictionary('feedback.locale'),
    ];
    feedbackItems.forEach(
      (item) => (systemMsg += `*${item}:* ${userData[item]}\n`)
    );

    return `${systemMsg}`;
  };
  return (
    <KeyboardAwareScrollView>
      {bannerMessage !== '' && (
        <Banner
          text={bannerMessage}
          textStyle={styles.textStyle}
          viewStyle={
            error !== '' ? styles.viewErrorStyle : styles.viewSuccessStyle
          }
          maxNonExpandedHeight={0}
          maxExpandedHeight={0}
          onDismiss={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
      )}
      <View style={{ padding: 24 }}>
        <Typography variant="h1" style={{ marginBottom: 8 }}>
          {dictionary('feedback.title')}
        </Typography>
        <Typography medium>{dictionary('feedback.info')}</Typography>

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
          placeholder={Platform.OS === 'web' ? undefined : dictionary('feedback.placeHolderText')}
          textAlignVertical={'top'}
          value={Platform.OS === 'web' ? undefined : feedback}
          inputAccessoryViewID={feedbackInputAccessoryViewID}
        >
          {Platform.OS === 'web' && <Typography medium>{feedback}</Typography>}
        </TextInput>
        {Platform.OS !== 'web' && <InputAccessoryView nativeID={feedbackInputAccessoryViewID}>
          <Button onPress={() => Keyboard.dismiss()} title="Done" />
        </InputAccessoryView>}
        <Button
          title="Send"
          viewStyle={{ width: '100%' }}
          disabled={feedback === '' || isBusy}
          onPress={() =>
            sendFeedback({
              product: props.product,
              user: `${account?.username.substring(
                0,
                account?.username.indexOf('@')
              )}`,
              msg: feedback,
              systemMsg: getSystemMessage(),
            })
          }
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

const DataField = (props: { itemKey: string; value: string }) => (
  <View
    style={{
      display: 'flex',
      flexDirection: 'row',
      padding: 8,
      borderColor: Colors.GRAY_1,
      borderBottomWidth: 1,
      marginVertical: 8,
    }}
  >
    <Typography style={{ width: '50%' }}>{`${props.itemKey}:`}</Typography>
    <Typography style={{ width: '50%' }}>{props.value}</Typography>
  </View>
);
export default FeedbackScreen;
