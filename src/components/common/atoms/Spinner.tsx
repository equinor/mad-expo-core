import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Spinner = (props: {
  size?: number | 'large' | 'small';
  style?: Object;
  color?: string;
}) => {
  const { style, size, color } = props;
  return (
    <View style={[styles.spinnerStyle, style]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

Spinner.defaultProps = {
  size: 'large',
  style: {},
  color: 'gray',
};

export default Spinner;
