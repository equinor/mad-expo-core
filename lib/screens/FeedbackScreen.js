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
var react_native_1 = require("react-native");
var common_1 = require("../components/common");
var react_1 = __importDefault(require("react"));
var Device = __importStar(require("expo-device"));
var Localization = __importStar(require("expo-localization"));
var react_2 = require("react");
var FeedbackScreen = function (props) {
    var _a = (0, react_2.useState)(""), feedback = _a[0], setFeedback = _a[1];
    var userData = {
        User: "[Not implemented yet]",
        "Device brand": "" + Device.brand,
        "Device id": "" + Device.modelName,
        "Operating system": Device.osName + " " + Device.osVersion,
        Timezone: Localization.timezone,
        Locale: Localization.locale,
        Feedback: feedback,
    };
    function sendFeedback() {
        //TODO send userData object
    }
    return (react_1.default.createElement(react_native_1.ScrollView, null,
        react_1.default.createElement(react_native_1.View, { style: { padding: 24 } },
            react_1.default.createElement(common_1.Typography, { variant: "h1", style: { marginBottom: 8 } }, "Have some feedback?"),
            react_1.default.createElement(common_1.Typography, { medium: true }, "We are collecting some information about your device as part of the feedback-process. By submitting you agree to share the following information:\n\n"),
            Object.keys(userData)
                .filter(function (key) { return key !== "Feedback"; })
                .map(function (key) {
                return react_1.default.createElement(DataField, { itemKey: key, value: userData[key] });
            }),
            react_1.default.createElement(react_native_1.TextInput, { style: {
                    height: 200,
                    width: "100%",
                    backgroundColor: "white",
                    padding: 16,
                    paddingTop: 16,
                    marginVertical: 16,
                    borderRadius: 4,
                }, onChangeText: function (e) { return setFeedback(e.toString()); }, multiline: true, placeholder: "Type your feedback here", textAlignVertical: "top" },
                react_1.default.createElement(common_1.Typography, { medium: true }, feedback)),
            react_1.default.createElement(common_1.Button, { title: "Send", viewStyle: { width: "100%" }, disabled: feedback === "", onPress: sendFeedback }))));
};
var DataField = function (props) { return (react_1.default.createElement(react_native_1.View, { style: { display: "flex", flexDirection: "row", padding: 8 } },
    react_1.default.createElement(common_1.Typography, { bold: true, style: { width: "50%" } }, "- " + props.itemKey + ":"),
    react_1.default.createElement(common_1.Typography, { style: { width: "50%" } }, props.value))); };
exports.default = FeedbackScreen;
