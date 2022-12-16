import React from 'react';
import { TextInput, TextInputProps } from 'react-native';

export const TextInputWithDoneButton = React.forwardRef(
  (props: TextInputProps) => (
    <TextInput inputAccessoryViewID="keyboard-done-button" {...props} />
  )
);
