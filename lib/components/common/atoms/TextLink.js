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
var react_native_1 = require("react-native");
var vector_icons_1 = require("@expo/vector-icons");
var Colors = __importStar(require("../../../stylesheets/colors"));
var Typography_1 = __importDefault(require("./Typography"));
var styles = react_native_1.StyleSheet.create({
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
var TextLink = function (props) {
    var data = props.data, textStyle = props.textStyle, nav = props.nav;
    return (react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: function () { return nav.navigate(data.route); }, style: styles.container },
        react_1.default.createElement(react_native_1.View, { style: styles.linkContainer },
            react_1.default.createElement(Typography_1.default, { style: [textStyle, styles.defaultText] }, data.name),
            react_1.default.createElement(vector_icons_1.Ionicons, { name: "ios-arrow-forward", style: styles.icon, size: 20, color: Colors.GRAY_2 }))));
};
TextLink.defaultProps = {
    textStyle: {},
};
exports.default = TextLink;
