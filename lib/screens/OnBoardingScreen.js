"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onboardingStorageKey = void 0;
var react_1 = __importDefault(require("react"));
var async_storage_1 = __importDefault(require("@react-native-async-storage/async-storage"));
//import * as appJson from '../../app.json';
var common_1 = require("../components/common");
var react_native_1 = require("react-native");
var react_2 = require("react");
var react_3 = require("react");
var Radiobutton_1 = __importDefault(require("../components/common/atoms/Radiobutton"));
var appJson = {
    expo: {
        name: "mad-react-native-expo-template"
    }
};
exports.onboardingStorageKey = "@onBoarding-" + appJson.expo.name;
var config = [
    {
        inputName: "Text input example",
        inputType: "text"
    },
    {
        inputName: "Select input example",
        inputType: "select",
        values: ["Value1", "Value2", "Value3"]
    },
    {
        inputName: "Multiselect input example",
        inputType: "multiselect",
        values: ["Value1", "Value2", "Value3"]
    }
];
var OnBoardingScreen = function (props) {
    var _a = (0, react_2.useState)(JSON.parse(JSON.stringify({}))), onboardingSettings = _a[0], setOnboardingSettings = _a[1];
    var storeData = function (value) { return __awaiter(void 0, void 0, void 0, function () {
        var valueToStore, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    if (!value) return [3 /*break*/, 2];
                    valueToStore = JSON.stringify(value);
                    console.log("Storing:", valueToStore);
                    return [4 /*yield*/, async_storage_1.default.setItem(exports.onboardingStorageKey, valueToStore)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, async_storage_1.default.removeItem(exports.onboardingStorageKey)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    e_1 = _a.sent();
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var getData = function () { return __awaiter(void 0, void 0, void 0, function () {
        var value, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, async_storage_1.default.getItem(exports.onboardingStorageKey)];
                case 1:
                    value = _a.sent();
                    if (value !== null) {
                        console.log("Value found:", value);
                        setOnboardingSettings(__assign({}, JSON.parse(value)));
                        //props.navigation.navigate("Root")
                    }
                    return [3 /*break*/, 3];
                case 2:
                    e_2 = _a.sent();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    function setOnboardingValue(key, value) {
        var newOnboardingSettings = __assign({}, onboardingSettings);
        newOnboardingSettings[key] = value;
        if (newOnboardingSettings != onboardingSettings)
            setOnboardingSettings(newOnboardingSettings);
    }
    (0, react_3.useEffect)(function () {
        //storeData(null);
        getData();
    }, []);
    if (onboardingSettings == {})
        return react_1.default.createElement(react_1.default.Fragment, null);
    console.log("Onboardingsettings:", onboardingSettings);
    return react_1.default.createElement(react_native_1.View, { style: { display: 'flex', padding: 20 } },
        config.map(function (inputConfig) {
            if (inputConfig.inputType === 'text') {
                return react_1.default.createElement(TextInput, { key: inputConfig.inputName, title: inputConfig.inputName, text: onboardingSettings[inputConfig.inputName], callback: setOnboardingValue });
            }
            if (inputConfig.values && inputConfig.inputType === 'select') {
                return react_1.default.createElement(Select, { key: inputConfig.inputName, title: inputConfig.inputName, selectedValues: onboardingSettings[inputConfig.inputName] ? onboardingSettings[inputConfig.inputName] : [], values: inputConfig.values, callback: setOnboardingValue });
            }
            if (inputConfig.values && inputConfig.inputType === 'multiselect') {
                return react_1.default.createElement(Select, { key: inputConfig.inputName, title: inputConfig.inputName, selectedValues: onboardingSettings[inputConfig.inputName] ? onboardingSettings[inputConfig.inputName] : '', values: inputConfig.values, callback: setOnboardingValue, multiselect: true });
            }
        }),
        react_1.default.createElement(common_1.Button, { title: "Submit", onPress: function () { storeData(onboardingSettings); props.navigation.replace("Root"); } }));
};
var TextInput = function (props) {
    return react_1.default.createElement(react_native_1.View, { style: { paddingVertical: 8 } },
        react_1.default.createElement(common_1.Typography, { variant: "h6" }, props.title),
        react_1.default.createElement("input", { style: { padding: 8, marginTop: 8 }, onChange: function (e) { return props.callback(props.title, e.target.value); }, value: props.text }));
};
var Select = function (props) {
    return react_1.default.createElement(react_native_1.View, { style: { paddingVertical: 8 } },
        react_1.default.createElement(common_1.Typography, { variant: "h6" }, props.title),
        props.values.map(function (value) { return react_1.default.createElement(react_native_1.View, { style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 } },
            react_1.default.createElement(common_1.Typography, null, value),
            props.multiselect ?
                react_1.default.createElement(common_1.Checkbox, { checked: props.selectedValues.includes(value), onValueChange: function (checked) {
                        var newSelectedValues = __spreadArray([], props.selectedValues, true);
                        if (checked)
                            newSelectedValues.push(value);
                        if (!checked)
                            newSelectedValues = newSelectedValues.filter(function (v) { return v !== value; });
                        props.callback(props.title, newSelectedValues);
                    } }) :
                react_1.default.createElement(Radiobutton_1.default, { checked: props.selectedValues.includes(value), onValueChange: function (checked) {
                        if (checked) {
                            props.callback(props.title, value);
                        }
                    } })); }));
};
exports.default = OnBoardingScreen;
