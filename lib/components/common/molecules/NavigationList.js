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
var colors = __importStar(require("../../../stylesheets/colors"));
var styles = react_native_1.StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: colors.GRAY_BACKGROUND,
    },
    itemContainer: {
        backgroundColor: 'white',
        height: 56,
        borderBottomWidth: 1,
        borderBottomColor: colors.GRAY_3,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        color: colors.BLACK_LIGHT,
        alignSelf: 'center',
    },
    textStyle: {
        fontSize: 16,
        color: colors.BLACK_GRAY,
        flex: 1,
        paddingHorizontal: 15,
    },
});
var NavigationList = function (props) {
    var items = props.items, fetching = props.fetching, navigation = props.navigation, onRefresh = props.onRefresh;
    var handleClick = function (index) {
        var item = items[index];
        navigation === null || navigation === void 0 ? void 0 : navigation.navigate(item.route, item.params);
    };
    var renderItem = function (props) { return (react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: function () { return handleClick(props.index); } },
        react_1.default.createElement(react_native_1.View, { style: styles.itemContainer },
            react_1.default.createElement(react_native_1.Text, { style: styles.textStyle }, props.item.label),
            react_1.default.createElement(vector_icons_1.MaterialIcons, { name: "chevron-right", style: styles.icon, size: 26 })))); };
    return (react_1.default.createElement(react_native_1.ScrollView, { style: styles.scrollView, refreshControl: onRefresh && react_1.default.createElement(react_native_1.RefreshControl, { refreshing: fetching, onRefresh: onRefresh }) },
        react_1.default.createElement(react_native_1.FlatList, { data: items, keyExtractor: function (item) { return item.key; }, renderItem: renderItem })));
};
exports.default = NavigationList;
