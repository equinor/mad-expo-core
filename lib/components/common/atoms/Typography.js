"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var expo_font_1 = require("expo-font");
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var Typography = function (props) {
    var variant = props.variant, color = props.color, light = props.light, medium = props.medium, bold = props.bold, italic = props.italic, size = props.size, style = props.style, children = props.children;
    function validateProps() {
        if ((light && medium) || (light && bold) || (medium && bold))
            throw new Error("You can only choose one of the following: Light, Medium, Bold");
    }
    validateProps();
    var loaded = (0, expo_font_1.useFonts)({
        "Equinor-Bold": require("../../../assets/fonts/Equinor-Bold.ttf"),
        "Equinor-BoldItalic": require("../../../assets/fonts/Equinor-BoldItalic.ttf"),
        "Equinor-Italic": require("../../../assets/fonts/Equinor-Italic.ttf"),
        "Equinor-Light": require("../../../assets/fonts/Equinor-Light.ttf"),
        "Equinor-LightItalic": require("../../../assets/fonts/Equinor-LightItalic.ttf"),
        "Equinor-Medium": require("../../../assets/fonts/Equinor-Medium.ttf"),
        "Equinor-MediumItalic": require("../../../assets/fonts/Equinor-MediumItalic.ttf"),
        "Equinor-Regular": require("../../../assets/fonts/Equinor-Regular.ttf"),
    })[0];
    var variants = {
        "h1": {
            size: 32,
            type: "Regular"
        },
        "h2": {
            size: 28,
            type: "Regular"
        },
        "h3": {
            size: 24,
            type: "Regular"
        },
        "h4": {
            size: 20,
            type: "Regular"
        },
        "h5": {
            size: 18,
            type: "Medium"
        },
        "h6": {
            size: 16,
            type: "Medium"
        },
        "p": {
            size: 16,
            type: "Regular"
        }
    };
    if (!variant)
        variant = "p";
    if (!size)
        size = variants[variant].size;
    var fontName = "Equinor-";
    if (light)
        fontName += "Light";
    if (medium)
        fontName += "Medium";
    if (bold)
        fontName += "Bold";
    if (italic)
        fontName += "Italic";
    if (!light && !medium && !bold && !italic) {
        fontName += variants[variant].type;
    }
    if (!loaded)
        return null;
    return react_1.default.createElement(react_native_1.Text, { style: [{ fontFamily: fontName, color: color, fontSize: size }, style] }, children);
};
exports.default = Typography;
