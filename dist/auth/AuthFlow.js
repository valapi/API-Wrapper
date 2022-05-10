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
exports.AuthFlow = void 0;
//import
const tough_cookie_1 = require("tough-cookie");
const lib_1 = require("@valapi/lib");
const AxiosClient_1 = require("../client/AxiosClient");
//class
/**
 * * Class ID: @ing3kth/valapi/ValClient/AuthFlow
 */
class AuthFlow extends lib_1.CustomEvent {
    /**
    * @param {ValWrapperAuth} data Account toJSON data
    */
    constructor(data) {
        super();
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
     * @param {IAxiosClient} auth_response First Auth Response
     * @param {String} UserAgent User Agent
     * @returns {Promise<ValWrapperAuth>}
     */
    execute(auth_response, UserAgent) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            if (auth_response.isError) {
                this.isError = true;
                return this.toJSON();
            }
            const axiosClient = new AxiosClient_1.AxiosClient({
                jar: this.cookie,
                withCredentials: true,
                timeout: this.expires_in * 1000,
            });
            //multifactor
            if (auth_response.data.type && auth_response.data.type == 'multifactor') {
                this.multifactor = true;
                return this.toJSON();
            }
            else {
                this.multifactor = false;
            }
            // get asscess token
            const Search_URL = new URL(auth_response.data.response.parameters.uri);
            this.access_token = String(new URLSearchParams(Search_URL.hash).get('#access_token'));
            this.id_token = String(new URLSearchParams(Search_URL.hash).get('id_token'));
            this.expires_in = Number(new URLSearchParams(Search_URL.hash).get('expires_in'));
            this.token_type = String(new URLSearchParams(Search_URL.hash).get('token_type'));
            //ENTITLEMENTS
            const entitlements_response = yield axiosClient.post('https://entitlements.auth.riotgames.com/api/token/v1', {}, {
                headers: {
                    'Authorization': `${this.token_type} ${this.access_token}`,
                    'User-Agent': UserAgent,
                },
            });
            this.entitlements_token = entitlements_response.data.entitlements_token;
            //REGION
            let region_response = yield axiosClient.put('https://riot-geo.pas.si.riotgames.com/pas/v1/product/valorant', {
                "id_token": this.id_token,
            }, {
                headers: {
                    'Authorization': `${this.token_type} ${this.access_token}`,
                }
            });
            if (!region_response.data.affinities || !((_a = region_response.data.affinities) === null || _a === void 0 ? void 0 : _a.pbe) || !((_b = region_response.data.affinities) === null || _b === void 0 ? void 0 : _b.live)) {
                region_response = {
                    isError: true,
                    data: {
                        affinities: {
                            pbe: 'na',
                            live: 'na',
                        }
                    }
                };
            }
            this.region.pbe = (_c = region_response.data.affinities) === null || _c === void 0 ? void 0 : _c.pbe;
            this.region.live = (_d = region_response.data.affinities) === null || _d === void 0 ? void 0 : _d.live;
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
     * @param {ValWrapperAuth} data Account toJSON data
     * @param {ValWrapperAxios} auth_response First Auth Response
     * @param {String} UserAgent User Agent
     * @returns {Promise<ValWrapperAuth>}
     */
    static execute(data, auth_response, UserAgent) {
        return __awaiter(this, void 0, void 0, function* () {
            const _newAuthFlow = new AuthFlow(data);
            return yield _newAuthFlow.execute(auth_response, UserAgent);
        });
    }
    /**
     * @param {ValWrapperAuth} data Account toJSON data
     * @param {String} url Url of First Auth Response
     * @param {String} UserAgent User Agent
     * @param {String} auth_type Auth Type
     * @returns {Promise<ValWrapperAuth>}
     */
    static fromUrl(data, url, UserAgent, auth_type = 'auth') {
        return __awaiter(this, void 0, void 0, function* () {
            const _newAuthFlow = new AuthFlow(data);
            const auth_response = {
                isError: false,
                data: {
                    type: auth_type,
                    response: {
                        parameters: {
                            uri: url,
                        },
                    },
                },
            };
            return yield _newAuthFlow.execute(auth_response, UserAgent);
        });
    }
}
exports.AuthFlow = AuthFlow;
//# sourceMappingURL=AuthFlow.js.map