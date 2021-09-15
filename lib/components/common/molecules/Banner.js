"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var react_native_1 = require("react-native");
var Colors = __importStar(require("../../../stylesheets/colors"));
var Typography_1 = __importDefault(require("../atoms/Typography"));
var styles = react_native_1.StyleSheet.create({
    bannerContainer: {
        backgroundColor: Colors.PURPLE_LIGHT,
    },
    bannerText: {
        fontSize: 14,
    },
});
var Banner = function (props) {
    var text = props.text, viewStyle = props.viewStyle, textStyle = props.textStyle;
    return (react_1.default.createElement(react_native_1.View, { style: [styles.bannerContainer, viewStyle] },
        react_1.default.createElement(Typography_1.default, { size: styles.bannerText.fontSize, style: [textStyle] }, text)));
};
Banner.propTypes = {
    text: prop_types_1.default.string,
    viewStyle: prop_types_1.default.oneOfType([prop_types_1.default.number, prop_types_1.default.object]),
    textStyle: prop_types_1.default.oneOfType([prop_types_1.default.number, prop_types_1.default.object]),
};
Banner.defaultProps = {
    text: '',
    viewStyle: {},
    textStyle: {},
};
exports.default = Banner;
