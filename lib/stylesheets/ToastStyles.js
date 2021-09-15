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
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var Colors = __importStar(require("./colors"));
exports.default = {
    success: react_native_1.StyleSheet.create({}),
    info: react_native_1.StyleSheet.create({}),
    warning: react_native_1.StyleSheet.create({}),
    error: react_native_1.StyleSheet.create({}),
    refresh: react_native_1.StyleSheet.create({
        container: {
            backgroundColor: Colors.BLUE,
            marginTop: 10,
            marginRight: 10,
            marginLeft: 10,
            borderRadius: 10,
            borderWidth: react_native_1.StyleSheet.hairlineWidth,
            borderColor: 'white',
            padding: 5,
        },
        text: {
            color: 'white',
            fontSize: 12,
        },
    }),
};
