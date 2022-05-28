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
exports.CookieAuth = void 0;
//import
const tough_cookie_1 = require("tough-cookie");
const AuthFlow_1 = require("./AuthFlow");
//class
/**
 * * Not Recommend
 */
class CookieAuth {
    /**
     * Class Constructor
     * @param {ValWrapperAuth} data Account toJSON data
     */
    constructor(data) {
        if (data.multifactor) {
            throw new Error('This Account is have a Multifactor');
        }
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
     * @param {String} UserAgent User Agent
     * @param {String} clientVersion Client Version
     * @param {String} clientPlatfrom Client Platform
     * @returns {Promise<any>}
     */
    execute(UserAgent, clientVersion, clientPlatfrom, RequestClient) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            //Cookie Reauth
            try {
                yield RequestClient.get('https://auth.riotgames.com/authorize?redirect_uri=https%3A%2F%2Fplayvalorant.com%2Fopt_in&client_id=play-valorant-web-prod&response_type=token%20id_token&nonce=1');
            }
            catch (err) {
                return yield AuthFlow_1.AuthFlow.fromUrl(this.toJSON(), err.request._currentUrl, UserAgent, clientVersion, clientPlatfrom, RequestClient);
            }
            this.cookie = new tough_cookie_1.CookieJar((_a = RequestClient.theAxios.defaults.httpsAgent.jar) === null || _a === void 0 ? void 0 : _a.store, {
                rejectPublicSuffixes: ((_c = (_b = RequestClient.theAxios.defaults.httpsAgent.options) === null || _b === void 0 ? void 0 : _b.jar) === null || _c === void 0 ? void 0 : _c.rejectPublicSuffixes) || undefined,
            });
            return this.toJSON();
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
     * @param {ValWrapperAuth} data ValAuth_Account toJSON data
     * @param {String} UserAgent User Agent
     * @param {String} clientVersion Client Version
     * @param {String} clientPlatfrom Client Platform
     * @returns {Promise<ValWrapperAuth>}
     */
    static reauth(data, UserAgent, clientVersion, clientPlatfrom, RequestClient) {
        return __awaiter(this, void 0, void 0, function* () {
            const CookieAccount = new CookieAuth(data);
            try {
                return yield CookieAccount.execute(UserAgent, clientVersion, clientPlatfrom, RequestClient);
            }
            catch (error) {
                CookieAccount.isError = true;
                return CookieAccount.toJSON();
            }
        });
    }
}
exports.CookieAuth = CookieAuth;
//# sourceMappingURL=CookieAuth.js.map