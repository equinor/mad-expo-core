import React from 'react';
import { TextInput, TextInputProps } from 'react-native';

export const TextInputWithDoneButton = React.forwardRef<TextInput>(
  (props: TextInputProps, ref) => (
    <TextInput ref={ref} inputAccessoryViewID="keyboard-done-button" {...props} />
  )
);
