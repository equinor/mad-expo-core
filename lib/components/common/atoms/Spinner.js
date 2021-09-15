"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var styles = react_native_1.StyleSheet.create({
    spinnerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
var Spinner = function (props) {
    var style = props.style, size = props.size, color = props.color;
    return (react_1.default.createElement(react_native_1.View, { style: [styles.spinnerStyle, style] },
        react_1.default.createElement(react_native_1.ActivityIndicator, { size: size, color: color })));
};
Spinner.defaultProps = {
    size: 'large',
    style: {},
    color: 'gray',
};
exports.default = Spinner;
