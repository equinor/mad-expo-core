import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Colors from '../../../stylesheets/colors';
import Typography from './Typography';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const SimpleInfoItem = (props:{ item:{key?:string, label?:string, text:string} }) => {
  const {item} = props;
  return(
  <View style={styles.container}>
    <Typography italic size={12}>{item.label}</Typography>
    <Typography color={Colors.GRAY_1} size={14}>{item.text}</Typography>
  </View>
)}

export default SimpleInfoItem;
