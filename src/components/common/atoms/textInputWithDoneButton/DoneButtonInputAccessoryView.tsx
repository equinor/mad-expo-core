import React from 'react';
import { InputAccessoryView, Keyboard, StyleSheet, View } from 'react-native';
import Button from '../Button';
import * as en from '../../../../resources/language/en.json';
import * as no from '../../../../resources/language/no.json';
import { EQUINOR_GREEN, GRAY_BORDER } from '../../../../assets/color/colors';
const languages = { en: en, no: no };

/**
 * @deprecated
 * Please transition to `@equinor/mad-components`.
 * If something is preventing you from making the transition,
 * please create an issue here: https://github.com/equinor/mad/issues
 */
export const DoneButtonInputAccessoryView = (props: {
  languageCode: string;
}) => {
  const langDict = languages[props.languageCode] ?? en;
  return (
    <InputAccessoryView nativeID="keyboard-done-button">
      <View style={styles.container}>
        <Button
          viewStyle={styles.buttonViewStyle}
          textStyle={styles.buttonTextStyle}
          onPress={() => Keyboard.dismiss()}
          title={langDict['keyboard.done']}
        />
      </View>
    </InputAccessoryView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: GRAY_BORDER,
  },
  buttonViewStyle: {
    backgroundColor: 'transparent',
    margin: 8,
  },
  buttonTextStyle: {
    color: EQUINOR_GREEN,
    fontFamily: 'Equinor-Medium',
  },
});
