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
/**
 * * Class ID: @ing3kth/valapi/ValClient/Account
 */
class Account {
    constructor() {
        this.cookie = new tough_cookie_1.CookieJar();
        this.access_token = '';
        this.id_token = '';
        this.expires_in = 3600;
        this.token_type = '';
        this.entitlements_token = '';
        this.region = {
            pbe: '',
            live: '',
        };
        this.multifactor = false;
        this.isError = false;
    }
    /**
     * @param {String} username Riot Account Username (not email)
     * @param {String} password Riot Account Password
     * @param {String} UserAgent User Agent
     * @returns {Promise<ValWrapperAuth>}
     */
    execute(username, password, UserAgent) {
        return __awaiter(this, void 0, void 0, function* () {
            const axiosClient = new AxiosClient_1.AxiosClient({
                jar: this.cookie,
                withCredentials: true,
                headers: {
                    'User-Agent': UserAgent,
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
                    'User-Agent': UserAgent
                },
            });
            //ACCESS TOKEN
            const auth_response = yield axiosClient.put('https://auth.riotgames.com/api/v1/authorization', {
                'type': 'auth',
                'username': username,
                'password': password,
                'remember': true,
            });
            return yield AuthFlow_1.AuthFlow.execute(this.toJSON(), auth_response, UserAgent);
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
     * @returns {Promise<ValWrapperAuth>}
     */
    static login(username, password, UserAgent) {
        return __awaiter(this, void 0, void 0, function* () {
            const NewAccount = new Account();
            return yield NewAccount.execute(username, password, UserAgent);
        });
    }
}
exports.Account = Account;
//# sourceMappingURL=Account.js.map