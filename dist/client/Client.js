"use strict";
//import
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValWebClient = void 0;
const tslib_1 = require("tslib");
const lib_1 = require("@valapi/lib");
const auth_1 = require("@valapi/auth");
const Engine_1 = require("@valapi/auth/dist/client/Engine");
const http_1 = require("http");
const https_1 = require("https");
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
        this.options = Object.assign(Object.assign({}, Engine_1.CONFIG_DEFAULT), config);
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
        var _a, _b;
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
        const _normalAxiosConfig = {
            headers: {
                Cookie: _data.cookie.ssid,
                'Authorization': `${_data.token_type} ${_data.access_token}`,
                'X-Riot-Entitlements-JWT': _data.entitlements_token,
                'X-Riot-ClientVersion': String((_a = this.AuthClient.config.client) === null || _a === void 0 ? void 0 : _a.version),
                'X-Riot-ClientPlatform': (0, lib_1.toUft8)(JSON.stringify((_b = this.AuthClient.config.client) === null || _b === void 0 ? void 0 : _b.platform)),
            },
            httpsAgent: new https_1.Agent({ keepAlive: true, ciphers: auth_1.ValAuthEngine.Default.ciphers, honorCipherOrder: true, minVersion: 'TLSv1.2', maxVersion: 'TLSv1.3' }),
            httpAgent: new http_1.Agent({ keepAlive: true }),
        };
        this.RequestClient = new lib_1.ValRequestClient(Object.assign(Object.assign({}, this.options.axiosConfig), _normalAxiosConfig));
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
     * From {@link ValAuthData save} data
     * @param {ValAuthData} data {@link toJSON toJSON()} data
     * @returns {void}
     */
    fromJSON(data) {
        this.AuthClient.fromJSON(data);
        this.reload();
    }
    /**
     * To {@link ValAuthData save} data
     * @returns {ValAuthData}
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
        return this.AuthClient.parsePlayerUuid(token);
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
      * From {@link toJSON toJSON()} data
      * @param {ValAuthData} data {@link toJSON toJSON()} data
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
