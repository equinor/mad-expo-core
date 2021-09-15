"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var vector_icons_1 = require("@expo/vector-icons");
var colors_1 = require("../../../stylesheets/colors");
var styles = {
    defaultButtonStyle: {
        backgroundColor: 'rgba(0,0,0,0)',
    },
};
var Radiobutton = function (props) {
    return (react_1.default.createElement(react_native_1.TouchableOpacity, { style: [styles.defaultButtonStyle, props.style], onPress: function () {
            props.onValueChange(props.disabled ? props.checked : !props.checked);
        }, disabled: props.disabled },
        react_1.default.createElement(vector_icons_1.MaterialIcons, { name: props.checked ? 'radio-button-checked' : 'radio-button-unchecked', size: props.size, color: props.color })));
};
Radiobutton.defaultProps = {
    checked: false,
    disabled: false,
    style: {},
    size: 24,
    color: colors_1.EQUINOR_GREEN,
};
exports.default = Radiobutton;
