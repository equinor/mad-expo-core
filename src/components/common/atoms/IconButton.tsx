import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import { EQUINOR_GREEN } from '../../../stylesheets/colors';

const styles = {
  defaultButtonStyle: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
};

const IconButton = (props:{onPress:CallableFunction, name, disabled?:boolean, size?: number, color?: string, style?: Object}) => {
  return (
    <TouchableOpacity
      style={[styles.defaultButtonStyle, props.style]}
      onPress={(e) => {
        props.onPress(e);
      }}
      disabled={props.disabled}
    >
      <MaterialIcons
        name={props.name}
        size={props.size}
        color={props.color}
      />
    </TouchableOpacity>
  );
}

IconButton.defaultProps = {
  checked: false,
  disabled: false,
  style: {},
  size: 24,
  color: EQUINOR_GREEN,
}


export default IconButton;