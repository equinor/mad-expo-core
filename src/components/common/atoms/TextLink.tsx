import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../stylesheets/colors';
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

/**
 * @deprecated
 * Please transition to `@equinor/mad-components`.
 * If something is preventing you from making the transition,
 * please create an issue here: https://github.com/equinor/mad/issues
 */
const TextLink = (props: {
  data: { name: string; route: string };
  textStyle?: Object;
  nav: { state: Object; navigate: Function };
}) => {
  const { data, textStyle, nav } = props;
  return (
    <TouchableOpacity
      onPress={() => nav.navigate(data.route)}
      style={styles.container}
    >
      <View style={styles.linkContainer}>
        <Typography style={[textStyle, styles.defaultText]}>
          {data.name}
        </Typography>
        <Ionicons
          name="arrow-forward"
          style={styles.icon}
          size={20}
          color={Colors.GRAY_2}
        />
      </View>
    </TouchableOpacity>
  );
};

TextLink.defaultProps = {
  textStyle: {},
};

export default TextLink;
