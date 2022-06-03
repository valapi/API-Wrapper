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
//class
class AuthFlow {
    /**
     * Class Constructor
     * @param {ValWrapperAuth} data Account toJSON data
     * @param {String} clientVersion Client Version
     * @param {String} clientPlatfrom Client Platform
     */
    constructor(data, clientVersion, clientPlatfrom) {
        this.cookie = tough_cookie_1.CookieJar.fromJSON(JSON.stringify(data.cookie));
        this.access_token = data.access_token;
        this.id_token = data.id_token;
        this.expires_in = data.expires_in;
        this.token_type = data.token_type;
        this.entitlements_token = data.entitlements_token;
        this.region = data.region;
        this.multifactor = data.multifactor;
        this.isError = data.isError;
        this.clientVersion = clientVersion;
        this.clientPlatfrom = clientPlatfrom;
    }
    /**
     * @param {IValRequestClient} auth_response First Auth Response
     * @param {String} UserAgent User Agent
     * @param {ValRequestClient} RequestClient Request Client
     * @param {Boolean} lockRegion Lock Region
     * @returns {Promise<ValWrapperAuth>}
     */
    execute(auth_response, UserAgent, RequestClient, lockRegion) {
        var _a, _b, _c, _d, _e, _f, _g;
        return __awaiter(this, void 0, void 0, function* () {
            if (auth_response.isError) {
                this.isError = true;
                return this.toJSON();
            }
            //multifactor
            if (auth_response.data.type && auth_response.data.type == 'multifactor') {
                this.multifactor = true;
                return this.toJSON();
            }
            else {
                this.multifactor = false;
            }
            // get asscess token
            if (!auth_response.data.response || !auth_response.data.response.parameters || !auth_response.data.response.parameters.uri) {
                this.isError = true;
                return this.toJSON();
            }
            const Search_URL = new URL(auth_response.data.response.parameters.uri);
            this.access_token = String(new URLSearchParams(Search_URL.hash).get('#access_token'));
            this.id_token = String(new URLSearchParams(Search_URL.hash).get('id_token'));
            this.expires_in = Number(new URLSearchParams(Search_URL.hash).get('expires_in')) || 3600;
            this.token_type = String(new URLSearchParams(Search_URL.hash).get('token_type')) || 'Bearer';
            //ENTITLEMENTS
            const entitlements_response = yield RequestClient.post('https://entitlements.auth.riotgames.com/api/token/v1', {}, {
                headers: {
                    'Authorization': `${this.token_type} ${this.access_token}`,
                    'User-Agent': String(UserAgent),
                },
            });
            this.entitlements_token = entitlements_response.data.entitlements_token;
            //REGION
            if (lockRegion === false) {
                let region_response = yield RequestClient.put('https://riot-geo.pas.si.riotgames.com/pas/v1/product/valorant', {
                    "id_token": this.id_token,
                }, {
                    headers: {
                        'Authorization': `${this.token_type} ${this.access_token}`,
                        'X-Riot-Entitlements-JWT': this.entitlements_token,
                        'X-Riot-ClientVersion': this.clientVersion,
                        'X-Riot-ClientPlatform': this.clientPlatfrom,
                        'User-Agent': String(UserAgent),
                    }
                });
                if (region_response.isError || !((_a = region_response.data.affinities) === null || _a === void 0 ? void 0 : _a.pbe) || !((_b = region_response.data.affinities) === null || _b === void 0 ? void 0 : _b.live)) {
                    region_response = {
                        isError: true,
                        data: {
                            affinities: {
                                pbe: 'na',
                                live: 'na',
                            },
                        },
                    };
                }
                this.region.pbe = ((_c = region_response.data.affinities) === null || _c === void 0 ? void 0 : _c.pbe) || 'na';
                this.region.live = ((_d = region_response.data.affinities) === null || _d === void 0 ? void 0 : _d.live) || 'na';
            }
            this.cookie = new tough_cookie_1.CookieJar((_e = RequestClient.theAxios.defaults.httpsAgent.jar) === null || _e === void 0 ? void 0 : _e.store, {
                rejectPublicSuffixes: ((_g = (_f = RequestClient.theAxios.defaults.httpsAgent.options) === null || _f === void 0 ? void 0 : _f.jar) === null || _g === void 0 ? void 0 : _g.rejectPublicSuffixes) || undefined,
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
     * @param {ValWrapperAuth} data Account toJSON data
     * @param {ValorantApiRequestResponse} auth_response First Auth Response
     * @param {ValWrapperAuthExtend} extendsData Extradata of auth
     * @returns {Promise<ValWrapperAuth>}
     */
    static execute(data, auth_response, extendsData) {
        return __awaiter(this, void 0, void 0, function* () {
            const _newAuthFlow = new AuthFlow(data, extendsData.clientVersion, extendsData.clientPlatform);
            try {
                return yield _newAuthFlow.execute(auth_response, extendsData.UserAgent, extendsData.RequestClient, extendsData.lockRegion);
            }
            catch (error) {
                _newAuthFlow.isError = true;
                return _newAuthFlow.toJSON();
            }
        });
    }
    /**
     * @param {ValWrapperAuth} data Account toJSON data
     * @param {String} url Url of First Auth Response
     * @param {ValWrapperAuthExtend} extendsData Extradata of auth
     * @returns {Promise<ValWrapperAuth>}
     */
    static fromUrl(data, url, extendsData) {
        return __awaiter(this, void 0, void 0, function* () {
            const _newAuthFlow = new AuthFlow(data, extendsData.clientVersion, extendsData.clientPlatform);
            if (!url.includes('https://playvalorant.com/opt_in')) {
                url = `https://playvalorant.com/opt_in${url}`;
            }
            const auth_response = {
                isError: false,
                data: {
                    type: 'auth',
                    response: {
                        parameters: {
                            uri: url,
                        },
                    },
                },
            };
            try {
                return yield _newAuthFlow.execute(auth_response, extendsData.UserAgent, extendsData.RequestClient, extendsData.lockRegion);
            }
            catch (error) {
                _newAuthFlow.isError = true;
                return _newAuthFlow.toJSON();
            }
        });
    }
}
exports.AuthFlow = AuthFlow;
//# sourceMappingURL=AuthFlow.js.map