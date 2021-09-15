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
var lodash_1 = require("lodash");
var colors = __importStar(require("../../../stylesheets/colors"));
var styles = react_native_1.StyleSheet.create({
    table: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    tableRow: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
    },
    oddTableRow: {
        backgroundColor: colors.GRAY_4,
    },
    tableHeaderRow: {
        paddingTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.GRAY_1,
    },
    tableCell: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: 4,
        paddingBottom: 4,
    },
    headerText: {
        color: colors.BLACK_GRAY,
        fontWeight: 'bold',
    },
    keyText: {
        color: colors.GRAY_1,
        fontSize: 12,
        fontWeight: '400',
    },
    valueText: {
        fontSize: 12,
    },
});
var DetailsTable = function (props) {
    var record = props.record;
    var printValue = function (val) {
        if ((0, lodash_1.isArray)(val)) {
            return val.length;
        }
        if ((0, lodash_1.isObject)(val)) {
            return JSON.stringify(val);
        }
        return val && val.toString();
    };
    return (react_1.default.createElement(react_native_1.ScrollView, null,
        react_1.default.createElement(react_native_1.View, { style: styles.table },
            react_1.default.createElement(react_native_1.View, { style: [styles.tableRow, styles.tableHeaderRow] },
                react_1.default.createElement(react_native_1.View, { style: styles.tableCell },
                    react_1.default.createElement(react_native_1.Text, { style: styles.headerText }, "Property")),
                react_1.default.createElement(react_native_1.View, { style: styles.tableCell },
                    react_1.default.createElement(react_native_1.Text, { style: styles.headerText }, "Value"))),
            Object.keys(record)
                .filter(function (k) { return !k.startsWith('_'); })
                .map(function (k, i) { return (react_1.default.createElement(react_native_1.View, { key: k, style: [styles.tableRow, i % 2 === 0 && styles.oddTableRow] },
                react_1.default.createElement(react_native_1.View, { style: styles.tableCell },
                    react_1.default.createElement(react_native_1.Text, { style: styles.keyText }, k)),
                react_1.default.createElement(react_native_1.View, { style: styles.tableCell },
                    react_1.default.createElement(react_native_1.Text, { style: styles.valueText }, printValue(record[k]) /*TODO this needs a rework in order to work with typescript*/)))); }))));
};
exports.default = DetailsTable;
