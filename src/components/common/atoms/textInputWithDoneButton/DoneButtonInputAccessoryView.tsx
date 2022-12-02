import React from 'react';
import { InputAccessoryView, Keyboard, StyleSheet, View } from 'react-native';
import Button from '../Button';
import * as en from '../../../../resources/language/en.json';
import * as no from '../../../../resources/language/no.json';
const languages = { en: en, no: no };

export const DoneButtonInputAccessoryView = (props: {
  languageCode: string;
}) => (
  <InputAccessoryView nativeID="keyboard-done-button">
    <View style={styles.container}>
      <Button
        viewStyle={styles.buttonViewStyle}
        textStyle={styles.buttonTextStyle}
        onPress={() => Keyboard.dismiss()}
        title={languages[props.languageCode]['keyboard.done']}
      />
    </View>
  </InputAccessoryView>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#DCDCDC',
  },
  buttonViewStyle: {
    backgroundColor: 'transparent',
    margin: 8,
  },
  buttonTextStyle: { color: '#007079', fontWeight: 'bold' },
});
