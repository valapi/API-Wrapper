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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CookieAuth = void 0;
//import
const tough_cookie_1 = require("tough-cookie");
const AuthFlow_1 = require("./AuthFlow");
const axios_1 = __importDefault(require("axios"));
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
     *
     * @param {Array<string>} ULRs Url list
     * @returns {string | undefined}
     */
    tranferURL(ULRs) {
        let UrlList = [];
        for (let myUrl of ULRs) {
            if (!myUrl.includes('access_token=')) {
                continue;
            }
            //check
            if (myUrl.startsWith('#')) {
                myUrl = myUrl;
            }
            if (myUrl.includes('playvalorant.com/opt_in')) {
                let replaceString = '';
                for (let i = 0; i < myUrl.length; i++) {
                    replaceString += myUrl.at(i);
                    if ((myUrl.at(i)) === 'h' && (myUrl.at(i + 1)) === 't' && (myUrl.at(i + 2)) === 't' && (myUrl.at(i + 3)) === 'p') {
                        myUrl = myUrl.replace(replaceString, '');
                    }
                }
                myUrl = myUrl;
            }
            //url score
            let urlScore = 0;
            if (myUrl.includes('access_token')) {
                urlScore += 2;
            }
            if (myUrl.includes('id_token')) {
                urlScore += 2;
            }
            if (myUrl.includes('token_type')) {
                urlScore += 2;
            }
            if (myUrl.includes('expires_in')) {
                urlScore += 1;
            }
            UrlList.push({
                score: urlScore,
                url: String(myUrl),
            });
        }
        //sort with score from most to worst
        console.log(UrlList);
        UrlList = UrlList.sort((a, b) => {
            return b.score - a.score;
        });
        return UrlList[0].url;
    }
    /**
     * @param {String} UserAgent User Agent
     * @param {String} clientVersion Client Version
     * @param {String} clientPlatfrom Client Platform
     * @returns {Promise<any>}
     */
    execute(UserAgent, clientVersion, clientPlatfrom, RequestClient, axiosConfig) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const axiosClient = axios_1.default.create(axiosConfig);
            //Cookie Reauth
            let _URL = '';
            try {
                yield axiosClient.get('https://auth.riotgames.com/authorize?redirect_uri=https%3A%2F%2Fplayvalorant.com%2Fopt_in&client_id=play-valorant-web-prod&response_type=token%20id_token&nonce=1', {
                    maxRedirects: RequestClient.theAxios.defaults.maxRedirects || 0,
                    headers: {
                        'X-Riot-ClientVersion': String(clientVersion),
                        'X-Riot-ClientPlatform': String(clientPlatfrom),
                        'User-Agent': String(UserAgent),
                    },
                    timeout: axios_1.default.defaults.timeout || 0,
                });
            }
            catch (error) {
                if (error.config.maxRedirects == 0) {
                    const possible_location = [
                        error.response.headers.location,
                        error.response.data,
                    ];
                    _URL = this.tranferURL(possible_location) || possible_location[0];
                }
                else if (error.config.maxRedirects == 1) {
                    const possible_location = [
                        error.request._options.hash,
                        error.request._options.href,
                        error.request._currentUrl,
                    ];
                    _URL = this.tranferURL(possible_location) || possible_location[2];
                }
                else {
                    this.isError = true;
                }
            }
            this.cookie = new tough_cookie_1.CookieJar((_a = axiosClient.defaults.httpsAgent.jar) === null || _a === void 0 ? void 0 : _a.store, {
                rejectPublicSuffixes: ((_c = (_b = axiosClient.defaults.httpsAgent.options) === null || _b === void 0 ? void 0 : _b.jar) === null || _c === void 0 ? void 0 : _c.rejectPublicSuffixes) || undefined,
            });
            return yield AuthFlow_1.AuthFlow.fromUrl(this.toJSON(), _URL, UserAgent, clientVersion, clientPlatfrom, RequestClient);
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
    static reauth(data, UserAgent, clientVersion, clientPlatfrom, RequestClient, axiosConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            const CookieAccount = new CookieAuth(data);
            try {
                return yield CookieAccount.execute(UserAgent, clientVersion, clientPlatfrom, RequestClient, axiosConfig);
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