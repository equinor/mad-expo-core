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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var expo_auth_session_1 = require("expo-auth-session");
var react_native_1 = require("react-native");
var Button_1 = __importDefault(require("../common/atoms/Button"));
//WebBrowser.maybeCompleteAuthSession();
function LoginButton(props) {
    var _this = this;
    //const [token, setToken] = React.useState<string>('');
    // Endpoint
    var discovery = (0, expo_auth_session_1.useAutoDiscovery)('https://login.microsoftonline.com/statoilsrm.onmicrosoft.com/v2.0');
    // Request
    var _a = (0, expo_auth_session_1.useAuthRequest)({
        //responseType: ResponseType.Code,
        clientId: props.environmentConstants.CLIENT_ID,
        scopes: ['openid', 'profile', 'email'],
        redirectUri: (0, expo_auth_session_1.makeRedirectUri)({
            scheme: "mad-expo-template"
        }),
    }, discovery), request = _a[0], response = _a[1], promptAsync = _a[2];
    function getUserInfo(token) {
        return __awaiter(this, void 0, void 0, function () {
            var returnValue_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(discovery === null || discovery === void 0 ? void 0 : discovery.userInfoEndpoint)) return [3 /*break*/, 2];
                        returnValue_1 = {};
                        return [4 /*yield*/, fetch(discovery.userInfoEndpoint.toString(), {
                                method: "GET",
                                headers: new Headers({
                                    Authorization: "Bearer " + token,
                                }),
                                redirect: 'follow'
                            }).catch(function (e) { return console.error(e); }).then(function (res) { return res.json().then(function (json) {
                                console.log("RES:", json);
                                returnValue_1 = json;
                            }); })];
                    case 1:
                        _a.sent();
                        console.log("FETCH FINISHED");
                        console.log("RETURN VALUE:", returnValue_1.toString());
                        return [2 /*return*/, returnValue_1];
                    case 2: return [2 /*return*/];
                }
            });
        });
    }
    React.useEffect(function () {
        console.log(response);
        if (response && response.type === 'success') {
            var getTokenAndUserInfo = function () { return __awaiter(_this, void 0, void 0, function () {
                var tokenRes, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            console.log("Getting token");
                            _a = discovery;
                            if (!_a) return [3 /*break*/, 2];
                            return [4 /*yield*/, (0, expo_auth_session_1.exchangeCodeAsync)({
                                    clientId: props.environmentConstants.CLIENT_ID,
                                    code: response.params.code,
                                    scopes: ['openid', 'profile', 'email'],
                                    redirectUri: (0, expo_auth_session_1.makeRedirectUri)({
                                        scheme: "mad-expo-template"
                                    }),
                                    extraParams: {
                                        code_verifier: (request === null || request === void 0 ? void 0 : request.codeVerifier) || "",
                                    }
                                }, discovery).catch(function (e) { return console.log(e); })];
                        case 1:
                            _a = (_b.sent());
                            _b.label = 2;
                        case 2:
                            tokenRes = _a;
                            if (!(tokenRes && (tokenRes === null || tokenRes === void 0 ? void 0 : tokenRes.accessToken) && tokenRes.accessToken !== null && tokenRes.accessToken !== "")) return [3 /*break*/, 4];
                            return [4 /*yield*/, getUserInfo(tokenRes.accessToken)];
                        case 3: return [2 /*return*/, _b.sent()];
                        case 4:
                            //set an error
                            console.log("ERROR");
                            _b.label = 5;
                        case 5: return [2 /*return*/, "ERROR"];
                    }
                });
            }); };
            getTokenAndUserInfo().then(function (r) { });
        }
    }, [response]);
    return (React.createElement(react_native_1.View, null,
        React.createElement(Button_1.default, { disabled: !request, title: "Login", onPress: function () {
                promptAsync();
            } })));
}
exports.default = LoginButton;
