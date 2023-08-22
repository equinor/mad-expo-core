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
const IconButton = (props: {
  onPress: CallableFunction;
  name;
  disabled?: boolean;
  size?: number;
  color?: string;
  style?: Object;
}) => {
  return (
    <TouchableOpacity
      style={[styles.defaultButtonStyle, props.style]}
      onPress={(e) => {
        props.onPress(e);
      }}
      disabled={props.disabled}
    >
      <MaterialIcons name={props.name} size={props.size} color={props.color} />
    </TouchableOpacity>
  );
};

IconButton.defaultProps = {
  checked: false,
  disabled: false,
  style: {},
  size: 24,
  color: Colors.EQUINOR_PRIMARY,
};

export default IconButton;
