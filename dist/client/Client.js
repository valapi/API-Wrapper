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
const _defaultConfig = {
    region: 'na',
    client: auth_1.ValAuthEngineDefault.client,
    axiosConfig: auth_1.ValAuthEngineDefault.axiosConfig,
    expiresIn: auth_1.ValAuthEngineDefault.expiresIn,
};
class ValWebClient extends lib_1.ValEvent {
    /**
     * Create a new Valorant API Wrapper Client
     * @param {ValWebClient.Options} config Client Config
     */
    constructor(config = {}) {
        super();
        this.AuthClient = new auth_1.Client(config);
        this.AuthClient.on('expires', ((data) => { this.emit('expires', data); }));
        this.AuthClient.on('error', ((data) => { this.emit('error', { errorCode: data.name, message: data.message, data: data.data }); }));
        //config
        this.options = new Object(Object.assign(Object.assign({}, _defaultConfig), config));
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
        this.Player = new Player_1.Player(this.RequestClient, this.RegionServices, Engine_1.CONFIG_UserAgent);
        //event
        this.emit('ready', this);
    }
    //reload
    reload() {
        var _a, _b;
        const _data = this.AuthClient.toJSON();
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
            httpsAgent: new https_1.Agent({ keepAlive: true, ciphers: Engine_1.CONFIG_Ciphers.join(':'), honorCipherOrder: true, minVersion: 'TLSv1.2', maxVersion: 'TLSv1.3' }),
            httpAgent: new http_1.Agent({ keepAlive: true }),
        };
        this.RequestClient = new lib_1.ValRequestClient(new Object(Object.assign(Object.assign(Object.assign({}, this.AuthClient.config.axiosConfig), this.options.axiosConfig), _normalAxiosConfig)));
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
        this.Player = new Player_1.Player(this.RequestClient, this.RegionServices, Engine_1.CONFIG_UserAgent);
        //event
        this.emit('ready', this);
    }
    //save
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
    //auth
    /**
     * Reconnect to the server
     * @param force force to reload (only token)
     * @returns {Promise<Array<ValAuth.Expire>>}
     */
    refresh(force) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.AuthClient.refresh(force);
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
        this.AuthClient.region.live = region;
        this.reload();
    }
    /**
     * @param {string} clientVersion Client Version
     * @returns {void}
     */
    setClientVersion(clientVersion) {
        var _a, _b;
        if (clientVersion === void 0) { clientVersion = (_a = auth_1.ValAuthEngineDefault.client) === null || _a === void 0 ? void 0 : _a.version; }
        this.options.client = {
            version: clientVersion,
            platform: (_b = this.options.client) === null || _b === void 0 ? void 0 : _b.platform,
        };
        this.reload();
    }
    /**
     * @param {ValAuthEngine.ClientPlatfrom} clientPlatfrom Client Platfrom in json
     * @returns {void}
     */
    setClientPlatfrom(clientPlatfrom) {
        var _a, _b;
        if (clientPlatfrom === void 0) { clientPlatfrom = (_a = auth_1.ValAuthEngineDefault.client) === null || _a === void 0 ? void 0 : _a.platform; }
        this.options.client = {
            version: (_b = this.options.client) === null || _b === void 0 ? void 0 : _b.version,
            platform: clientPlatfrom,
        };
        this.reload();
    }
    //static
    /**
      * From {@link toJSON toJSON()} data
      * @param {ValAuthData} data {@link toJSON toJSON()} data
      * @param {ValAuthEngine.Options} options Client Config
      * @returns {ValAuth}
      */
    static fromJSON(data, options) {
        const _WebClient = new ValWebClient(options);
        _WebClient.fromJSON(data);
        return _WebClient;
    }
}
exports.ValWebClient = ValWebClient;
