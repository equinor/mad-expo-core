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
import { authenticateSilently, getAccount } from 'mad-expo-core';

import Colors from '../stylesheets/colors';
import type { MSALAccount } from 'react-native-msal';
import { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { dictionary, setLanguage } from '../resources/language/dictionary';

const createIncidentScreen = (props: {
  locale: string;
  timezone: string;
  scopes: string[];
  apiBaseUrl: string;
  product: string;
  languageCode?: string;
}) => {
  props.languageCode ? setLanguage(props.languageCode) : setLanguage('en');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ticket, setTicket] = useState('ENQ123456');
  const [error, setError] = useState('Error 500');
  const [isBusy, setIsBusy] = useState(false);
  const [account, setAccount] = useState<MSALAccount>(null);

  const isWeb = Platform.OS === 'web';

  useEffect(() => {
    getAccount()
      .then((acc) => {
        setAccount(acc);
      })
      .catch((error) => {
        throw error;
      });
  }, []);
  const userData: { [key: string]: string } = {
    [dictionary('feedback.user')]: `${account?.username}`,
    [dictionary('feedback.deviceBrand')]: `${isWeb ? 'web' : Device.brand}`,
    [dictionary('feedback.device')]: `${isWeb ? 'web' : Device.modelName} `,
    [dictionary('feedback.OS')]: `${Device.osName} ${Device.osVersion}`,
    [dictionary('feedback.timezone')]: `${props?.timezone}`,
    [dictionary('feedback.locale')]: `${props?.locale}`,
  };
  const feedbackInputAccessoryViewID = 'feedbackInput';

  interface incidentData {
    callerEmail: string;
    title: string;
    description: string;
  }

  const createIncident = (data: incidentData) => {
    setIsBusy(true);
    authenticateSilently(props.scopes)
      .then((r) =>
        fetch(`${props.apiBaseUrl}/ServiceNow/apps/${props.product}/incidents`, {

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
              response.json().then((data) => {
                const result = JSON.parse(data).result.details;
                setIsBusy(false);
                setDescription('');
                setTitle('');
                setTicket(result.number);
              })
            }
          })
          .catch((error) => {
            setIsBusy(false);
            setError(error);
            console.error(error);
          })
      )
      .catch((error) => {
        throw error;
      });
  };

  const createDescription = (): string => {
    let systemMsg = '';
    const feedbackItems = [
      dictionary('feedback.user'),
      dictionary('feedback.deviceBrand'),
      dictionary('feedback.device'),
      dictionary('feedback.OS'),
      dictionary('feedback.timezone'),
      dictionary('feedback.locale'),
    ];
    feedbackItems.forEach(
      (item) => (systemMsg += `${item}: ${userData[item]}\n`)
    );
    return `${systemMsg}\n${description}`;
  };
  return (
    <KeyboardAwareScrollView>
      <View style={{ padding: 24 }}>
        <Typography variant="h1" style={{ marginBottom: 8 }}>
          {dictionary("createIncident.title")}
        </Typography>
        <Typography medium>{dictionary("createIncident.info")}</Typography>

        {Object.entries(userData)
          .map(([key, value]) => {
            return <DataField key={key} itemKey={key} value={value} />;
          })}
        {
          ticket && <View style={styles.ticketCreated}>
            <Typography style={{color: Colors.WHITE}}>
              {dictionary("createIncident.created1") + ticket + dictionary("createIncident.created2")}
            </Typography>
          </View>
        }
        {
          error && <View style={styles.errorOccurred}>
            <Typography style={{color: Colors.WHITE}}>
              {dictionary("createIncident.error") + error}
            </Typography>
          </View>
        }
        <TextInput
          style={styles.titleInputStyle}
          onChangeText={(e) => setTitle(e.toString())}
          placeholder={dictionary("createIncident.placeholderTitle")}
          textAlignVertical={'top'}
          value={title}
          inputAccessoryViewID={feedbackInputAccessoryViewID}
        />
        <TextInput
          style={styles.textFieldStyle}
          onChangeText={(e) => setDescription(e.toString())}
          multiline
          placeholder={dictionary("createIncident.placeholderDescription")}
          textAlignVertical={'top'}
          value={description}
          inputAccessoryViewID={feedbackInputAccessoryViewID}
        />
        {!isWeb && (
          <InputAccessoryView nativeID={feedbackInputAccessoryViewID}>
            <Button onPress={() => Keyboard.dismiss()} title="Done" />
          </InputAccessoryView>
        )}
        <Button
          title="Send"
          viewStyle={{ width: '100%' }}
          disabled={description === '' || title === '' || isBusy}
          onPress={() =>
            createIncident({
              callerEmail: account?.username,
              title: title,
              description: createDescription(),
            })
          }
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

const DataField = (props: { itemKey: string; value: string }) => (
  <View style={styles.dataField}>
    <Typography style={{ width: '50%' }}>{`${props.itemKey}:`}</Typography>
    <Typography style={{ width: '50%' }}>{props.value}</Typography>
  </View>
);

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
  titleInputStyle: {
    height: 40,
    width: '100%',
    backgroundColor: 'white',
    padding: 8,
    marginTop: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'gray',
  },
  textFieldStyle: {
    height: 200,
    width: '100%',
    backgroundColor: 'white',
    padding: 16,
    paddingTop: 16,
    marginVertical: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'gray',
  },
  dataField: {
    display: 'flex',
    flexDirection: 'row',
    padding: 8,
    borderColor: Colors.GRAY_1,
    borderBottomWidth: 1,
    marginVertical: 8,
  },
  ticketCreated: {
    padding: 8,
    marginTop: 16,
    backgroundColor: Colors.EQUINOR_PRIMARY,
    borderRadius: 4
  },
  errorOccurred: {
    padding: 8,
    marginTop: 16,
    backgroundColor: Colors.RED,
    borderRadius: 4
  },
});

export default createIncidentScreen;
