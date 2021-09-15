"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var common_1 = require("../components/common");
var react_1 = __importDefault(require("react"));
var vector_icons_1 = require("@expo/vector-icons");
var colors_1 = require("../stylesheets/colors");
var SettingsScreen = function (props) {
    return (react_1.default.createElement(react_native_1.ScrollView, null,
        react_1.default.createElement(react_native_1.View, { style: { padding: 24 } },
            react_1.default.createElement(Setting, { icon: "app-settings-alt", title: "Onboarding", route: "Onboarding", navigation: props.navigation }),
            react_1.default.createElement(Setting, { icon: "feedback", title: "Feedback", route: "Feedback", navigation: props.navigation }))));
};
var Setting = function (props) {
    return react_1.default.createElement(vector_icons_1.MaterialIcons.Button, { name: props.icon, onPress: function () { return props.navigation.navigate(props.route); }, backgroundColor: "transparent", color: "#007079", underlayColor: colors_1.GREEN_LIGHT, style: { padding: 12 } },
        react_1.default.createElement(common_1.Typography, { medium: true, color: "#007079" }, props.title));
};
exports.default = SettingsScreen;
