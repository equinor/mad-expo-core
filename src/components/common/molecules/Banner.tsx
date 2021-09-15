import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import * as Colors from '../../../stylesheets/colors';
import Typography from '../atoms/Typography';

const styles = StyleSheet.create({
  bannerContainer: {
    backgroundColor: Colors.PURPLE_LIGHT,
  },
  bannerText: {
    fontSize: 14,
  },
});

const Banner = (props:{ text?:string, viewStyle?:Object, textStyle?:Object }) => {
  const {text, viewStyle, textStyle} = props;
  return(
  <View style={[styles.bannerContainer, viewStyle]}>
    <Typography size={styles.bannerText.fontSize} style={[textStyle]}>{text}</Typography>
  </View>
)}

Banner.propTypes = {
  text: PropTypes.string,
  viewStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  textStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
};

Banner.defaultProps = {
  text: '',
  viewStyle: {},
  textStyle: {},
};

export default Banner;
