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
exports.Multifactor = void 0;
//import
const tough_cookie_1 = require("tough-cookie");
const AuthFlow_1 = require("./AuthFlow");
//class
class Multifactor {
    /**
     * Class Constructor
     * @param {ValWrapperAuth} data Account toJSON data
     */
    constructor(data) {
        if (!data.multifactor) {
            throw new Error('This Account is not have a Multifactor');
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
    * @param {Number} verificationCode Verification Code
    * @param {ValWrapperAuthExtend} extendsData Extradata of auth
    * @returns {Promise<ValWrapperAuth>}
    */
    execute(verificationCode, extendsData) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            //ACCESS TOKEN
            const auth_response = yield extendsData.RequestClient.put('https://auth.riotgames.com/api/v1/authorization', {
                "type": "multifactor",
                "code": String(verificationCode),
                "rememberDevice": true
            });
            if (!auth_response.isError) {
                this.multifactor = false;
            }
            this.cookie = new tough_cookie_1.CookieJar((_a = extendsData.RequestClient.theAxios.defaults.httpsAgent.jar) === null || _a === void 0 ? void 0 : _a.store, {
                rejectPublicSuffixes: ((_c = (_b = extendsData.RequestClient.theAxios.defaults.httpsAgent.options) === null || _b === void 0 ? void 0 : _b.jar) === null || _c === void 0 ? void 0 : _c.rejectPublicSuffixes) || undefined,
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
     * @param {ValWrapperAuth} data ValAuth_Account toJSON data
     * @param {Number} verificationCode Verification Code
     * @param {ValWrapperAuthExtend} extendsData Extradata of auth
     * @returns {Promise<ValWrapperAuth>}
     */
    static verify(data, verificationCode, extendsData) {
        return __awaiter(this, void 0, void 0, function* () {
            const MultifactorAccount = new Multifactor(data);
            try {
                return yield MultifactorAccount.execute(verificationCode, extendsData);
            }
            catch (error) {
                MultifactorAccount.isError = true;
                return MultifactorAccount.toJSON();
            }
        });
    }
}
exports.Multifactor = Multifactor;
//# sourceMappingURL=Multifactor.js.map