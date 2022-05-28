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
exports.WrapperClient = void 0;
//import
const lib_1 = require("@valapi/lib");
const tough_cookie_1 = require("tough-cookie");
const lib_2 = require("@valapi/lib");
const http_cookie_agent_1 = require("http-cookie-agent");
const Account_1 = require("../auth/Account");
const Multifactor_1 = require("../auth/Multifactor");
const CookieAuth_1 = require("../auth/CookieAuth");
//service
const Contract_1 = require("../service/Contract");
const CurrentGame_1 = require("../service/CurrentGame");
const Party_1 = require("../service/Party");
const PreGame_1 = require("../service/PreGame");
const Session_1 = require("../service/Session");
const Store_1 = require("../service/Store");
const Client_1 = require("../custom/Client");
const Match_1 = require("../custom/Match");
const MMR_1 = require("../custom/MMR");
const Player_1 = require("../custom/Player");
const _Client_Version = 'release-04.08-shipping-15-701907';
const _Client_Platfrom = {
    "platformType": "PC",
    "platformOS": "Windows",
    "platformOSVersion": "10.0.19042.1.256.64bit",
    "platformChipset": "Unknown"
};
const _defaultConfig = {
    userAgent: 'RiotClient/43.0.1.41953 86.4190634 rso-auth (Windows; 10;;Professional, x64)',
    region: 'na',
    client: {
        version: _Client_Version,
        platform: _Client_Platfrom,
    },
    forceAuth: false,
    axiosConfig: {},
};
//class
class WrapperClient extends lib_1.ValEvent {
    /**
     * Create a new Valorant API Wrapper Client
     * @param {ValWrapperConfig} config Client Config
     */
    constructor(config = {}) {
        var _a, _b;
        super();
        //config
        this.config = new Object(Object.assign(Object.assign({}, _defaultConfig), config));
        if (config.region) {
            this.lockRegion = true;
        }
        else {
            this.lockRegion = false;
        }
        if (!this.config.region) {
            this.config.region = 'na';
        }
        //create without auth
        this.cookie = new tough_cookie_1.CookieJar();
        this.access_token = '';
        this.id_token = '';
        this.expires_in = 3600;
        this.token_type = 'Bearer';
        this.entitlements_token = '';
        this.region = {
            pbe: 'na',
            live: this.config.region,
        };
        this.multifactor = false;
        this.isError = false;
        // first reload
        if (this.lockRegion === true && this.config.region) {
            this.region.live = this.config.region;
        }
        this.RegionServices = new lib_2.ValRegion(this.region.live).toJSON();
        //request client
        const ciphers = [
            'TLS_CHACHA20_POLY1305_SHA256',
            'TLS_AES_128_GCM_SHA256',
            'TLS_AES_256_GCM_SHA384',
            'TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256'
        ];
        const _axiosConfig = {
            headers: {
                'Authorization': `${this.token_type} ${this.access_token}`,
                'X-Riot-Entitlements-JWT': this.entitlements_token,
                'X-Riot-ClientVersion': String((_a = this.config.client) === null || _a === void 0 ? void 0 : _a.version),
                'X-Riot-ClientPlatform': (0, lib_1.toUft8)(JSON.stringify((_b = this.config.client) === null || _b === void 0 ? void 0 : _b.platform)),
            },
            httpsAgent: new http_cookie_agent_1.HttpsCookieAgent({ jar: this.cookie, keepAlive: true, ciphers: ciphers.join(':'), honorCipherOrder: true, minVersion: 'TLSv1.2' }),
        };
        this.RequestClient = new lib_2.ValRequestClient(new Object(Object.assign(Object.assign({}, _axiosConfig), this.config.axiosConfig)));
        this.RequestClient.on('error', ((data) => { this.emit('error', data); }));
        this.RequestClient.on('request', ((data) => { this.emit('request', data); }));
        //service
        this.Contract = new Contract_1.Contract(this.RequestClient, this.RegionServices);
        this.CurrentGame = new CurrentGame_1.CurrentGame(this.RequestClient, this.RegionServices);
        this.Party = new Party_1.Party(this.RequestClient, this.RegionServices);
        this.Pregame = new PreGame_1.PreGame(this.RequestClient, this.RegionServices);
        this.Session = new Session_1.Session(this.RequestClient, this.RegionServices);
        this.Store = new Store_1.Store(this.RequestClient, this.RegionServices);
        this.Client = new Client_1.Client(this.RequestClient, this.RegionServices);
        this.Match = new Match_1.Match(this.RequestClient, this.RegionServices);
        this.MMR = new MMR_1.MMR(this.RequestClient, this.RegionServices);
        this.Player = new Player_1.Player(this.RequestClient, this.RegionServices, String(this.config.userAgent));
        //event
        this.emit('ready');
    }
    //reload
    /**
     * Reload Class
     * @returns {void}
     */
    reload() {
        var _a, _b;
        if (this.lockRegion === true && this.config.region) {
            this.region.live = this.config.region;
        }
        this.RegionServices = new lib_2.ValRegion(this.region.live).toJSON();
        //request client
        const ciphers = [
            'TLS_CHACHA20_POLY1305_SHA256',
            'TLS_AES_128_GCM_SHA256',
            'TLS_AES_256_GCM_SHA384',
            'TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256'
        ];
        const _axiosConfig = {
            headers: {
                'Authorization': `${this.token_type} ${this.access_token}`,
                'X-Riot-Entitlements-JWT': this.entitlements_token,
                'X-Riot-ClientVersion': String((_a = this.config.client) === null || _a === void 0 ? void 0 : _a.version),
                'X-Riot-ClientPlatform': (0, lib_1.toUft8)(JSON.stringify((_b = this.config.client) === null || _b === void 0 ? void 0 : _b.platform)),
            },
            httpsAgent: new http_cookie_agent_1.HttpsCookieAgent({ jar: this.cookie, keepAlive: true, ciphers: ciphers.join(':'), honorCipherOrder: true, minVersion: 'TLSv1.2' }),
        };
        this.RequestClient = new lib_2.ValRequestClient(new Object(Object.assign(Object.assign({}, _axiosConfig), this.config.axiosConfig)));
        this.RequestClient.on('error', ((data) => { this.emit('error', data); }));
        this.RequestClient.on('request', ((data) => { this.emit('request', data); }));
        //service
        this.Contract = new Contract_1.Contract(this.RequestClient, this.RegionServices);
        this.CurrentGame = new CurrentGame_1.CurrentGame(this.RequestClient, this.RegionServices);
        this.Party = new Party_1.Party(this.RequestClient, this.RegionServices);
        this.Pregame = new PreGame_1.PreGame(this.RequestClient, this.RegionServices);
        this.Session = new Session_1.Session(this.RequestClient, this.RegionServices);
        this.Store = new Store_1.Store(this.RequestClient, this.RegionServices);
        this.Client = new Client_1.Client(this.RequestClient, this.RegionServices);
        this.Match = new Match_1.Match(this.RequestClient, this.RegionServices);
        this.MMR = new MMR_1.MMR(this.RequestClient, this.RegionServices);
        this.Player = new Player_1.Player(this.RequestClient, this.RegionServices, String(this.config.userAgent));
        //event
        this.emit('ready');
    }
    //save
    /**
     *
     * @returns {ValWrapperClient}
     */
    toJSON() {
        return {
            cookie: this.cookie.toJSON(),
            access_token: this.access_token,
            id_token: this.id_token,
            token_type: this.token_type,
            entitlements_token: this.entitlements_token,
            region: this.region,
        };
    }
    /**
     *
     * @param {ValWrapperClient} data Client `.toJSON()` data
     * @returns {void}
     */
    fromJSON(data) {
        if (!data.cookie) {
            data.cookie = new tough_cookie_1.CookieJar().toJSON();
        }
        if (!data.token_type) {
            data.token_type = 'Bearer';
        }
        this.cookie = tough_cookie_1.CookieJar.fromJSON(JSON.stringify(data.cookie));
        this.access_token = data.access_token;
        this.id_token = data.id_token || '';
        this.token_type = data.token_type;
        this.entitlements_token = data.entitlements_token;
        this.region = data.region;
        this.reload();
    }
    //auth
    /**
     *
     * @returns {ValWrapperAuth}
     */
    toJSONAuth() {
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
     *
     * @param {ValWrapperAuth} auth Authentication Data
     * @returns {void}
     */
    fromJSONAuth(auth) {
        this.cookie = tough_cookie_1.CookieJar.fromJSON(JSON.stringify(auth.cookie));
        this.access_token = auth.access_token;
        this.id_token = auth.id_token;
        this.expires_in = auth.expires_in || Number(3600);
        this.token_type = auth.token_type;
        this.entitlements_token = auth.entitlements_token;
        this.region = auth.region;
        if (!this.region.live) {
            this.region.live = 'na';
        }
        this.multifactor = auth.multifactor || Boolean(false);
        this.isError = auth.isError || Boolean(false);
        if (auth.isError && !this.config.forceAuth) {
            this.emit('error', {
                errorCode: 'ValWrapper_Authentication_Error',
                message: 'Authentication Error',
                data: auth,
            });
        }
        this.reload();
    }
    /**
     * * Not Recommend to use
     * @returns {Promise<void>}
     */
    fromCookie() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const NewCookieAuth = yield CookieAuth_1.CookieAuth.reauth(this.toJSONAuth(), this.config.userAgent || String(this.config.userAgent), String((_a = this.config.client) === null || _a === void 0 ? void 0 : _a.version), (0, lib_1.toUft8)(JSON.stringify((_b = this.config.client) === null || _b === void 0 ? void 0 : _b.platform)), this.RequestClient);
            this.fromJSONAuth(NewCookieAuth);
        });
    }
    /**
     * Login to Riot Account
     * @param {String} username Username
     * @param {String} password Password
     * @returns {Promise<void>}
     */
    login(username, password) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const NewAuth = yield Account_1.Account.login(this.toJSONAuth(), username, password, String(this.config.userAgent), String((_a = this.config.client) === null || _a === void 0 ? void 0 : _a.version), (0, lib_1.toUft8)(JSON.stringify((_b = this.config.client) === null || _b === void 0 ? void 0 : _b.platform)), this.RequestClient);
            this.fromJSONAuth(NewAuth);
            this.reload();
        });
    }
    /**
     * Multi-Factor Authentication
     * @param {number} verificationCode Verification Code
     * @returns {Promise<void>}
     */
    verify(verificationCode) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const NewAuth = yield Multifactor_1.Multifactor.verify(this.toJSONAuth(), Number(verificationCode), String(this.config.userAgent), String((_a = this.config.client) === null || _a === void 0 ? void 0 : _a.version), (0, lib_1.toUft8)(JSON.stringify((_b = this.config.client) === null || _b === void 0 ? void 0 : _b.platform)), this.RequestClient);
            this.fromJSONAuth(NewAuth);
            this.reload();
        });
    }
    //settings
    /**
     * @param {String} region Region
     * @returns {void}
     */
    setRegion(region) {
        this.emit('changeSettings', { name: 'region', data: region });
        this.config.region = region;
        this.region.live = region;
        this.reload();
    }
    /**
     * @param {String} clientVersion Client Version
     * @returns {void}
     */
    setClientVersion(clientVersion = _Client_Version) {
        var _a;
        this.emit('changeSettings', { name: 'client_version', data: clientVersion });
        this.config.client = {
            version: clientVersion,
            platform: (_a = this.config.client) === null || _a === void 0 ? void 0 : _a.platform,
        };
        this.reload();
    }
    /**
     * @param {ValWrapperClientPlatfrom} clientPlatfrom Client Platfrom in json
     * @returns {void}
     */
    setClientPlatfrom(clientPlatfrom = _Client_Platfrom) {
        var _a;
        this.emit('changeSettings', { name: 'client_platfrom', data: clientPlatfrom });
        this.config.client = {
            version: (_a = this.config.client) === null || _a === void 0 ? void 0 : _a.version,
            platform: clientPlatfrom,
        };
        this.reload();
    }
    /**
     * @param {CookieJar.Serialized} cookie Cookie
     * @returns {void}
     */
    setCookie(cookie) {
        this.emit('changeSettings', { name: 'cookie', data: cookie });
        this.cookie = tough_cookie_1.CookieJar.fromJSON(JSON.stringify(cookie));
        this.reload();
    }
    //static
    /**
     * * Something went wrong? try to not use static methods.
     * @param {ValWrapperConfig} config Client Config
     * @param {ValWrapperClient} data Client `.toJSON()` data
     * @returns {WrapperClient}
     */
    static fromJSON(config, data) {
        const NewClient = new WrapperClient(config);
        NewClient.fromJSON(data);
        if (config.region) {
            NewClient.setRegion(config.region);
        }
        else if (data.region.live) {
            NewClient.setRegion(data.region.live);
        }
        return NewClient;
    }
}
exports.WrapperClient = WrapperClient;
//# sourceMappingURL=Client.js.map