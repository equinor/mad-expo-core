import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../../stylesheets/colors';

const styles = {
  defaultButtonStyle: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
};

/**
 * @deprecated
 * Please transition to `@equinor/mad-components`.
 * If something is preventing you from making the transition,
 * please create an issue here: https://github.com/equinor/mad/issues
 */
const Radiobutton = (props: {
  onValueChange: CallableFunction;
  checked?: boolean;
  disabled?: boolean;
  size?: number;
  color?: string;
  style?: Object;
}) => {
  return (
    <TouchableOpacity
      style={[styles.defaultButtonStyle, props.style]}
      onPress={() => {
        props.onValueChange(props.disabled ? props.checked : !props.checked);
      }}
      disabled={props.disabled}
    >
      <MaterialIcons
        name={props.checked ? 'radio-button-checked' : 'radio-button-unchecked'}
        size={props.size}
        color={props.color}
      />
    </TouchableOpacity>
  );
};

Radiobutton.defaultProps = {
  checked: false,
  disabled: false,
  style: {},
  size: 24,
  color: Colors.EQUINOR_PRIMARY,
};

export default Radiobutton;
