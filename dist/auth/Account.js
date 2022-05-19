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
const AxiosClient_1 = require("../client/AxiosClient");
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
     * @param {String} UserAgent User Agent
     * @param {String} clientVersion Client Version
     * @param {String} clientPlatfrom Client Platform
     * @returns {Promise<ValWrapperAuth>}
     */
    execute(username, password, UserAgent, clientVersion, clientPlatfrom) {
        return __awaiter(this, void 0, void 0, function* () {
            const axiosClient = new AxiosClient_1.AxiosClient({
                jar: this.cookie,
                withCredentials: true,
                headers: {
                    'User-Agent': String(UserAgent),
                }
            });
            yield axiosClient.post('https://auth.riotgames.com/api/v1/authorization', {
                "client_id": "play-valorant-web-prod",
                "nonce": "1",
                "redirect_uri": "https://playvalorant.com/opt_in",
                "response_type": "token id_token",
                "scope": "account openid"
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': String(UserAgent),
                },
            });
            //ACCESS TOKEN
            const auth_response = yield axiosClient.put('https://auth.riotgames.com/api/v1/authorization', {
                'type': 'auth',
                'username': String(username),
                'password': String(password),
                'remember': true,
            });
            return yield AuthFlow_1.AuthFlow.execute(this.toJSON(), auth_response, UserAgent, clientVersion, clientPlatfrom);
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
     * @param {String} username Riot Account Username
     * @param {String} password Riot Account Password
     * @param {String} UserAgent User Agent
     * @param {String} clientVersion Client Version
     * @param {String} clientPlatfrom Client Platform
     * @returns {Promise<ValWrapperAuth>}
     */
    static login(data, username, password, UserAgent, clientVersion, clientPlatfrom) {
        return __awaiter(this, void 0, void 0, function* () {
            const NewAccount = new Account(data);
            try {
                return yield NewAccount.execute(username, password, UserAgent, clientVersion, clientPlatfrom);
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