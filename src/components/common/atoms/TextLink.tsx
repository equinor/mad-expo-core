import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import * as Colors from '../../../stylesheets/colors';
import Typography from './Typography';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linkContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  defaultText: {
    flex: 1,
  },
  icon: {
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },
});

const TextLink = (props:{ data:{name: string, route: string}, textStyle?:Object, nav:{state:Object, navigate:Function} }) => {
  const {data, textStyle, nav} = props;
  return (
  <TouchableOpacity
    onPress={() => nav.navigate(data.route)}
    style={styles.container}
  >
    <View style={styles.linkContainer}>
      <Typography style={[textStyle, styles.defaultText]}>{data.name}</Typography>
      <Ionicons name="ios-arrow-forward" style={styles.icon} size={20} color={Colors.GRAY_2} />
    </View>
  </TouchableOpacity>
)}

TextLink.defaultProps = {
  textStyle: {},
};

export default TextLink;
