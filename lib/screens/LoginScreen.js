"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var expo_auth_session_1 = require("expo-auth-session");
var react_native_1 = require("react-native");
var LoginButton_1 = __importDefault(require("../components/Authentication/LoginButton"));
function LoginScreen(props) {
    return (react_1.default.createElement(react_native_1.View, { style: styles.container },
        react_1.default.createElement(LoginButton_1.default, { environmentConstants: props.environmentConstants }),
        react_1.default.createElement(react_native_1.Text, null, (0, expo_auth_session_1.makeRedirectUri)({
            scheme: 'mad-expo-template'
        }))));
}
exports.default = LoginScreen;
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
