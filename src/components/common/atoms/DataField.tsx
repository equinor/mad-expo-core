import { StyleProp, View, ViewStyle } from 'react-native';
import { Typography } from 'mad-expo-core';
import React from 'react';

/**
 * @deprecated
 * Please transition to `@equinor/mad-components`.
 * If something is preventing you from making the transition,
 * please create an issue here: https://github.com/equinor/mad/issues
 */
export const DataField = (props: {
  itemKey: string;
  value: string;
  viewStyle: StyleProp<ViewStyle>;
}) => (
  <View style={props.viewStyle}>
    <Typography style={{ width: '50%' }}>{`${props.itemKey}:`}</Typography>
    <Typography style={{ width: '50%' }}>{props.value}</Typography>
  </View>
);
