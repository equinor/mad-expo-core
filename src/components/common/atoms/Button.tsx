import React from 'react';
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  GestureResponderEvent,
} from 'react-native';
import Typography from './Typography';
import Colors from '../../../stylesheets/colors';

const styles = {
  defaultTextStyle: {
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0)',
    fontSize: 16,
  },
  defaultButtonStyle: {
    flexDirection: 'row',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.EQUINOR_PRIMARY,
  },
};

/**
 * @deprecated
 * Please transition to `@equinor/mad-components`.
 * If something is preventing you from making the transition,
 * please create an issue here: https://github.com/equinor/mad/issues
 */
const Button = (props: {
  title: string | JSX.Element;
  onPress: (event: GestureResponderEvent) => void;
  textStyle: Object;
  viewStyle: Object;
  disabled: boolean;
  busy: boolean;
}) => {
  const { defaultButtonStyle, defaultTextStyle } = styles;
  const { title, onPress, textStyle, viewStyle, disabled, busy } = props;

  const titleComponent =
    typeof title === 'string' ? (
      <Typography style={[defaultTextStyle, textStyle]}>{title}</Typography>
    ) : (
      title
    );

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View
        style={[defaultButtonStyle, viewStyle, disabled && { opacity: 0.5 }]}
      >
        {busy && <ActivityIndicator size="small" style={{ marginRight: 4 }} />}
        {titleComponent}
      </View>
    </TouchableOpacity>
  );
};

/*
Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  textStyle: Text.propTypes.style,
  viewStyle: Text.propTypes.style,
  disabled: PropTypes.bool,
  busy: PropTypes.bool,
};
*/

Button.defaultProps = {
  textStyle: {},
  viewStyle: {},
  disabled: false,
  busy: false,
};

export default Button;
