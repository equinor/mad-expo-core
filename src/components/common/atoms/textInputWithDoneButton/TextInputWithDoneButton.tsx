import React from 'react';
import { TextInput, TextInputProps } from 'react-native';

/**
 * @deprecated
 * Please transition to `@equinor/mad-components`.
 * If something is preventing you from making the transition,
 * please create an issue here: https://github.com/equinor/mad/issues
 */
export const TextInputWithDoneButton = React.forwardRef<TextInput>(
  (props: TextInputProps, ref) => (
    <TextInput
      ref={ref}
      inputAccessoryViewID="keyboard-done-button"
      {...props}
    />
  )
);
