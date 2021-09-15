"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var Typography_1 = __importDefault(require("./Typography"));
var colors_1 = require("../../../stylesheets/colors");
var styles = {
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
        backgroundColor: colors_1.EQUINOR_GREEN,
    },
};
var Button = function (props) {
    var defaultButtonStyle = styles.defaultButtonStyle, defaultTextStyle = styles.defaultTextStyle;
    var title = props.title, onPress = props.onPress, textStyle = props.textStyle, viewStyle = props.viewStyle, disabled = props.disabled, busy = props.busy;
    var titleComponent = typeof title === 'string' ? react_1.default.createElement(Typography_1.default, { style: [defaultTextStyle, textStyle] }, title) : title;
    return (react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: onPress, disabled: disabled },
        react_1.default.createElement(react_native_1.View, { style: [defaultButtonStyle, viewStyle, disabled && { opacity: 0.5 }] },
            busy && react_1.default.createElement(react_native_1.ActivityIndicator, { size: "small", style: { marginRight: 4 } }),
            titleComponent)));
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
exports.default = Button;
