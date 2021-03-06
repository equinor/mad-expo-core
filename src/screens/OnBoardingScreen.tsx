import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import * as appJson from '../../app.json';
import { Button, Checkbox, Typography } from '../components/common';
import { View, TextInput } from 'react-native';
import { useState } from 'react';
import { useEffect } from 'react';
import Radiobutton from '../components/common/atoms/Radiobutton';

const OnBoardingScreen = (props: {
  config: any;
  storageKey: string;
  navigation: any;
}) => {
  const [onboardingSettings, setOnboardingSettings] = useState(
    JSON.parse(JSON.stringify({}))
  );
  const config = props.config;
  const onboardingStorageKey = props.storageKey;
  const storeData = async (value: Object | null) => {
    try {
      if (value) {
        const valueToStore = JSON.stringify(value);
        await AsyncStorage.setItem(onboardingStorageKey, valueToStore);
      } else {
        await AsyncStorage.removeItem(onboardingStorageKey);
      }
    } catch (e) {
      // saving error
    }
  };

  function setOnboardingValue(key: string, value: string | string[]) {
    let newOnboardingSettings = { ...onboardingSettings };
    newOnboardingSettings[key] = value;
    if (newOnboardingSettings != onboardingSettings)
      setOnboardingSettings(newOnboardingSettings);
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem(onboardingStorageKey);
        if (value !== null) {
          setOnboardingSettings({ ...JSON.parse(value) });
        }
      } catch (e) {
        // error reading value
      }
    };
    //storeData(null);
    getData();
  }, [onboardingStorageKey]);

  if (onboardingSettings == {}) return <></>;
  return (
    <View style={{ display: 'flex', padding: 20 }}>
      {config.map((inputConfig) => {
        if (inputConfig.inputType === 'text') {
          return (
            <Input
              key={inputConfig.inputName}
              title={inputConfig.inputName}
              text={onboardingSettings[inputConfig.inputName]}
              callback={setOnboardingValue}
            />
          );
        }
        if (inputConfig.values && inputConfig.inputType === 'select') {
          return (
            <Select
              key={inputConfig.inputName}
              title={inputConfig.inputName}
              selectedValues={
                onboardingSettings[inputConfig.inputName]
                  ? onboardingSettings[inputConfig.inputName]
                  : []
              }
              values={inputConfig.values}
              callback={setOnboardingValue}
            />
          );
        }
        if (inputConfig.values && inputConfig.inputType === 'multiselect') {
          return (
            <Select
              key={inputConfig.inputName}
              title={inputConfig.inputName}
              selectedValues={
                onboardingSettings[inputConfig.inputName]
                  ? onboardingSettings[inputConfig.inputName]
                  : ''
              }
              values={inputConfig.values}
              callback={setOnboardingValue}
              multiselect
            />
          );
        }
        return <></>;
      })}
      <Button
        title="Submit"
        onPress={() => {
          storeData(onboardingSettings);
          props.navigation.replace('Root');
        }}
      />
    </View>
  );
};

const Input = (props: {
  title: string;
  text: string;
  callback: CallableFunction;
}) => {
  return (
    <View style={{ paddingVertical: 8 }}>
      <Typography variant="h6">{props.title}</Typography>
      <TextInput
        style={{ padding: 8, marginTop: 8 }}
        onChangeText={(text) => props.callback(props.title, text)}
        value={props.text}
      />
    </View>
  );
};

const Select = (props: {
  title: string;
  values: string[];
  selectedValues: string[];
  callback: CallableFunction;
  multiselect?: boolean;
}) => {
  return (
    <View style={{ paddingVertical: 8 }}>
      <Typography variant="h6">{props.title}</Typography>
      {props.values.map((value, index) => (
        <View
          key={index}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 8,
          }}
        >
          <Typography>{value}</Typography>
          {props.multiselect ? (
            <Checkbox
              checked={props.selectedValues.includes(value)}
              onValueChange={(checked: boolean) => {
                let newSelectedValues = [...props.selectedValues];
                if (checked) newSelectedValues.push(value);
                if (!checked)
                  newSelectedValues = newSelectedValues.filter(
                    (v) => v !== value
                  );
                props.callback(props.title, newSelectedValues);
              }}
            />
          ) : (
            <Radiobutton
              checked={props.selectedValues.includes(value)}
              onValueChange={(checked: boolean) => {
                if (checked) {
                  props.callback(props.title, value);
                }
              }}
            />
          )}
        </View>
      ))}
    </View>
  );
};

export default OnBoardingScreen;
