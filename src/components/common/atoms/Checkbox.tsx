import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';
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
const Checkbox = (props: {
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
        name={props.checked ? 'check-box' : 'check-box-outline-blank'}
        size={props.size}
        color={props.color}
      />
    </TouchableOpacity>
  );
};

Checkbox.defaultProps = {
  checked: false,
  disabled: false,
  style: {},
  size: 24,
  color: Colors.EQUINOR_PRIMARY,
};

export default Checkbox;
