"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var IconButton_1 = __importDefault(require("../atoms/IconButton"));
var SettingsButton = function (props) { return react_1.default.createElement(IconButton_1.default, { name: 'settings', onPress: function () { return props.navigation.navigate("Settings"); }, style: { padding: 16 } }); };
exports.default = SettingsButton;
