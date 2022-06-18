"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
//import
const tough_cookie_1 = require("tough-cookie");
const AuthFlow_1 = require("./AuthFlow");
//class
class Account {
    /**
     * Class Constructor
     * @param {ValWrapperAuth} data Authentication Data
     */
    constructor(data) {
        this.cookie = tough_cookie_1.CookieJar.fromJSON(JSON.stringify(data.cookie));
        this.access_token = data.access_token;
        this.id_token = data.id_token;
        this.expires_in = data.expires_in;
        this.token_type = data.token_type;
        this.entitlements_token = data.entitlements_token;
        this.region = data.region;
        this.multifactor = data.multifactor;
        this.isError = data.isError;
    }
    /**
     * @param {String} username Riot Account Username (not email)
     * @param {String} password Riot Account Password
     * @param {ValWrapperAuthExtend} extendsData Extradata of auth
     * @returns {Promise<ValWrapperAuth>}
     */
    execute(username, password, extendsData) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function* () {
            yield extendsData.RequestClient.post('https://auth.riotgames.com/api/v1/authorization', {
                "client_id": "play-valorant-web-prod",
                "nonce": "1",
                "redirect_uri": "https://playvalorant.com/opt_in",
                "response_mode": "query",
                "response_type": "token id_token",
                "scope": "account openid"
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': String(extendsData.UserAgent),
                },
            });
            this.cookie = new tough_cookie_1.CookieJar((_a = extendsData.RequestClient.theAxios.defaults.httpsAgent.jar) === null || _a === void 0 ? void 0 : _a.store, {
                rejectPublicSuffixes: ((_c = (_b = extendsData.RequestClient.theAxios.defaults.httpsAgent.options) === null || _b === void 0 ? void 0 : _b.jar) === null || _c === void 0 ? void 0 : _c.rejectPublicSuffixes) || undefined,
            });
            //ACCESS TOKEN
            const auth_response = yield extendsData.RequestClient.put('https://auth.riotgames.com/api/v1/authorization', {
                'type': 'auth',
                'username': String(username),
                'password': String(password),
                'remember': true,
            });
            this.cookie = new tough_cookie_1.CookieJar((_d = extendsData.RequestClient.theAxios.defaults.httpsAgent.jar) === null || _d === void 0 ? void 0 : _d.store, {
                rejectPublicSuffixes: ((_f = (_e = extendsData.RequestClient.theAxios.defaults.httpsAgent.options) === null || _e === void 0 ? void 0 : _e.jar) === null || _f === void 0 ? void 0 : _f.rejectPublicSuffixes) || undefined,
            });
            return yield AuthFlow_1.AuthFlow.execute(this.toJSON(), auth_response, extendsData);
        });
    }
    /**
     *
     * @returns {ValWrapperAuth}
     */
    toJSON() {
        return {
            cookie: this.cookie.toJSON(),
            access_token: this.access_token,
            id_token: this.id_token,
            expires_in: this.expires_in,
            token_type: this.token_type,
            entitlements_token: this.entitlements_token,
            region: this.region,
            multifactor: this.multifactor,
            isError: this.isError,
        };
    }
    /**
     * @param {ValWrapperAuth} data Authentication Data
     * @param {String} username Riot Account Username
     * @param {String} password Riot Account Password
     * @param {ValWrapperAuthExtend} extendsData Extradata of auth
     * @returns {Promise<ValWrapperAuth>}
     */
    static login(data, username, password, extendsData) {
        return __awaiter(this, void 0, void 0, function* () {
            const NewAccount = new Account(data);
            try {
                return yield NewAccount.execute(username, password, extendsData);
            }
            catch (error) {
                NewAccount.isError = true;
                return NewAccount.toJSON();
            }
        });
    }
}
exports.Account = Account;
//# sourceMappingURL=Account.js.map