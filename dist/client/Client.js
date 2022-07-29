"use strict";
//import
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValWebClient = void 0;
const tslib_1 = require("tslib");
const lib_1 = require("@valapi/lib");
const auth_1 = require("@valapi/auth");
const https_1 = require("https");
const http_1 = require("http");
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
//class
/**
 * API from Web Client
 */
class ValWebClient extends lib_1.ValEvent {
    /**
     * Create a new {@link ValWebClient} Client
     * @param {ValWebClient.Options} config Client Config
     */
    constructor(config = {}) {
        super();
        //data
        this.isError = false;
        this.isMultifactor = false;
        this.AuthClient = new auth_1.Client(config);
        this.AuthClient.on('expires', ((data) => { this.emit('expires', data); }));
        this.AuthClient.on('error', ((data) => { this.emit('error', { errorCode: data.name, message: data.message, data: data.data }); }));
        //config
        this.options = Object.assign(Object.assign({}, auth_1.ValAuthEngine.Default.config), config);
        this.RegionServices = new lib_1.ValRegion(this.AuthClient.region.live).toJSON();
        //axios
        this.RequestClient = new lib_1.ValRequestClient(this.options.axiosConfig);
        this.RequestClient.on('request', ((data) => { this.emit('request', data); }));
        this.RequestClient.on('error', ((data) => { this.emit('error', data); }));
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
        this.Player = new Player_1.Player(this.RequestClient, this.RegionServices, auth_1.ValAuthEngine.Default.userAgent);
        //event
        this.emit('ready');
    }
    //reload
    reload() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        const _data = this.AuthClient.toJSON();
        this.isError = _data.isError;
        this.isMultifactor = _data.isMultifactor;
        this.AuthClient.region = {
            live: this.options.region || _data.region.live,
            pbe: "na",
        };
        //config
        this.AuthClient.config = this.options;
        this.RegionServices = new lib_1.ValRegion(_data.region.live).toJSON();
        //axios
        let HttpsConfig = { keepAlive: true, ciphers: auth_1.ValAuthEngine.Default.ciphers, honorCipherOrder: true, minVersion: 'TLSv1.2', maxVersion: 'TLSv1.3' };
        let HttpConfig = { keepAlive: true };
        if (((_a = this.options.axiosConfig) === null || _a === void 0 ? void 0 : _a.proxy) && typeof ((_b = this.options.axiosConfig) === null || _b === void 0 ? void 0 : _b.proxy) !== 'boolean') {
            HttpsConfig = Object.assign(Object.assign({}, HttpsConfig), { port: (_d = (_c = this.options.axiosConfig) === null || _c === void 0 ? void 0 : _c.proxy) === null || _d === void 0 ? void 0 : _d.port, host: (_f = (_e = this.options.axiosConfig) === null || _e === void 0 ? void 0 : _e.proxy) === null || _f === void 0 ? void 0 : _f.host });
            HttpConfig = Object.assign(Object.assign({}, HttpConfig), { port: (_h = (_g = this.options.axiosConfig) === null || _g === void 0 ? void 0 : _g.proxy) === null || _h === void 0 ? void 0 : _h.port, host: (_k = (_j = this.options.axiosConfig) === null || _j === void 0 ? void 0 : _j.proxy) === null || _k === void 0 ? void 0 : _k.host });
        }
        this.RequestClient = new lib_1.ValRequestClient(Object.assign(Object.assign({}, this.options.axiosConfig), {
            headers: {
                Cookie: _data.cookie.ssid,
                'Authorization': `${_data.token_type} ${_data.access_token}`,
                'X-Riot-Entitlements-JWT': _data.entitlements_token,
                'X-Riot-ClientVersion': String((_l = this.AuthClient.config.client) === null || _l === void 0 ? void 0 : _l.version),
                'X-Riot-ClientPlatform': (0, lib_1.toUft8)(JSON.stringify((_m = this.AuthClient.config.client) === null || _m === void 0 ? void 0 : _m.platform)),
            },
            httpsAgent: new https_1.Agent(HttpsConfig),
            httpAgent: new http_1.Agent(HttpConfig)
        }));
        this.RequestClient.on('request', ((data) => { this.emit('request', data); }));
        this.RequestClient.on('error', ((data) => { this.emit('error', data); }));
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
        this.Player = new Player_1.Player(this.RequestClient, this.RegionServices, auth_1.ValAuthEngine.Default.userAgent);
        //event
        this.emit('ready');
    }
    //save
    fromCookie(cookie) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.AuthClient.fromCookie(cookie);
            this.reload();
        });
    }
    /**
     *
     * @param {ValAuthEngine.Json} data {@link toJSON toJSON()} data
     * @returns {void}
     */
    fromJSON(data) {
        this.AuthClient.fromJSON(data);
        this.reload();
    }
    /**
     *
     * @returns {ValAuthEngine.Json}
     */
    toJSON() {
        return this.AuthClient.toJSON();
    }
    /**
     *
     * @param {string} token Access Token
     * @returns {string} Player UUID
     */
    getSubject(token) {
        return this.AuthClient.parseToken(token);
    }
    //auth
    /**
     * Reconnect to the server
     * @param force force to reload (only token)
     * @returns {Promise<Array<ValAuth.Expire>>}
     */
    refresh(force) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ExpireData = yield this.AuthClient.refresh(force);
            if (this.options.region) {
                this.AuthClient.region.live = this.options.region;
            }
            return ExpireData;
        });
    }
    /**
     * Login to Riot Account
     * @param {string} username Username
     * @param {string} password Password
     * @returns {Promise<void>}
     */
    login(username, password) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.AuthClient.login(username, password);
            this.reload();
        });
    }
    /**
     * Multi-Factor Authentication
     * @param {number} verificationCode Verification Code
     * @returns {Promise<void>}
     */
    verify(verificationCode) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.AuthClient.verify(verificationCode);
            this.reload();
        });
    }
    //settings
    /**
     * @param {string} region Region
     * @returns {void}
     */
    setRegion(region) {
        this.options.region = region;
        this.reload();
    }
    /**
     * @param {string} clientVersion Client Version
     * @returns {void}
     */
    setClientVersion(clientVersion = auth_1.ValAuthEngine.Default.client.version) {
        var _a;
        this.options.client = {
            version: clientVersion,
            platform: (_a = this.options.client) === null || _a === void 0 ? void 0 : _a.platform,
        };
        this.reload();
    }
    /**
     * @param {ValAuthEngine.ClientPlatfrom} clientPlatfrom Client Platfrom in json
     * @returns {void}
     */
    setClientPlatfrom(clientPlatfrom = auth_1.ValAuthEngine.Default.client.platform) {
        var _a;
        this.options.client = {
            version: (_a = this.options.client) === null || _a === void 0 ? void 0 : _a.version,
            platform: clientPlatfrom,
        };
        this.reload();
    }
    //static
    /**
      *
      * @param {ValAuthEngine.Json} data {@link toJSON toJSON()} data
      * @param {ValWebClient.Options} options Client Config
      * @returns {ValWebClient}
      */
    static fromJSON(data, options) {
        const _WebClient = new ValWebClient(options);
        _WebClient.fromJSON(data);
        if (!(options === null || options === void 0 ? void 0 : options.region)) {
            _WebClient.setRegion(data.region.live);
        }
        return _WebClient;
    }
    /**
     * From ssid Cookie
     * @param {string} cookie ssid Cookie
     * @param {ValWebClient.Options} options Client Config
     * @returns {Promise<ValWebClient>}
     */
    static fromCookie(cookie, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const _WebClient = new ValWebClient(options);
            yield _WebClient.fromCookie(cookie);
            return _WebClient;
        });
    }
}
exports.ValWebClient = ValWebClient;
