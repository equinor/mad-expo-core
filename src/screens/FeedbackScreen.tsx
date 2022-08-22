import * as Device from 'expo-device';

import { Button, Typography } from '../components/common';
import React, { useEffect } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { authenticateSilently, getAccount } from '../services/auth';

import { Banner } from 'mad-expo-core';
import Colors from '../stylesheets/colors';
import type { MSALAccount } from 'react-native-msal';
import { useState } from 'react';

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
  language: any;
}) => {
  const languageDict = props.language.languages.filter(item => item.name === props.language.currentLanguage.Language)[0].static;
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
    [languageDict["feedback.user"]]: `${account?.username.substring(0, account?.username.indexOf('@'))}`,
    [languageDict["feedback.deviceBrand"]]: `${Platform.OS === 'web' ? 'web' : Device.brand}`,
    [languageDict["feedback.device"]]: `${Platform.OS === 'web' ? 'web' : Device.modelName} `,
    [languageDict["feedback.OS"]]: `${Device.osName} ${Device.osVersion}`,
    [languageDict["feedback.timezone"]]: `${props?.timezone}`,
    [languageDict["feedback.locale"]]: `${props?.locale}`,
    'Feedback': feedback,
  }

  interface feedbackData {
    product: string;
    user: string;
    msg: string;
    systemMsg: string;
  }

  const sendFeedback = (data: feedbackData) => {
    setIsBusy(true);
    authenticateSilently(props.scopes).then((r) => (

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
    ));
  }

  const getSystemMessage = (): string => {
    let systemMsg = '\n\n';
    const feedbackItems = [
      'Device brand',
      'Device',
      'Operating system',
      'Timezone',
      'Locale',
    ];
    feedbackItems.forEach(
      (item) => (systemMsg += `*${item}:* ${userData[item]}\n`)
    );

    return `${systemMsg}`;
  };

  return (
    <ScrollView>
      {bannerMessage !== '' && (
        <Banner
          text={bannerMessage}
          textStyle={styles.textStyle}
          viewStyle={error !== '' ? styles.viewErrorStyle : styles.viewSuccessStyle} maxNonExpandedHeight={0} maxExpandedHeight={0} onDismiss={function (): void {
            throw new Error('Function not implemented.');
          } }        />
      )}
      <View style={{ padding: 24 }}>
        <Typography variant="h1" style={{ marginBottom: 8 }}>
          {languageDict["feedback.title"]}
        </Typography>
        <Typography medium>
          {
            languageDict["feedback.info"]
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
          placeholder={languageDict["feedback.placeHolderText"]}
          textAlignVertical={'top'}
          value={Platform.OS === 'web' ? feedback : undefined}
        >
          {Platform.OS === 'web' && <Typography medium>{feedback}</Typography>}
        </TextInput>
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
    </ScrollView>
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
