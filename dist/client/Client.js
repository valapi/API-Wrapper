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
const Uft8_1 = require("../util/Uft8");
const tough_cookie_1 = require("tough-cookie");
const lib_2 = require("@valapi/lib");
const Account_1 = require("../auth/Account");
const Multifactor_1 = require("../auth/Multifactor");
const _Client_Version = 'release-04.08-shipping-15-701907';
const _Client_Platfrom = {
    "platformType": "PC",
    "platformOS": "Windows",
    "platformOSVersion": "10.0.19042.1.256.64bit",
    "platformChipset": "Unknown"
};
//service
const Client_1 = require("../service/Client");
const Contract_1 = require("../service/Contract");
const CurrentGame_1 = require("../service/CurrentGame");
const Match_1 = require("../service/Match");
const Party_1 = require("../service/Party");
const Player_1 = require("../service/Player");
const PreGame_1 = require("../service/PreGame");
const Store_1 = require("../service/Store");
//class
class WrapperClient extends lib_1.CustomEvent {
    constructor(config = {}) {
        super();
        //config
        if (!config.UserAgent) {
            config.UserAgent = 'RiotClient/43.0.1.41953 86.4190634 rso-auth (Windows; 10;;Professional, x64)';
        }
        if (!config.client) {
            config.client = {
                version: _Client_Version,
                platform: _Client_Platfrom,
            };
        }
        else {
            if (!config.client.version) {
                config.client.version = _Client_Version;
            }
            if (!config.client.platform) {
                config.client.platform = _Client_Platfrom;
            }
        }
        this.config = {
            UserAgent: config.UserAgent,
            Region: 'na',
            client: {
                version: config.client.version,
                platform: config.client.platform,
            },
            lockRegion: false,
        };
        if (!config.Region) {
            this.config.lockRegion = false;
        }
        else {
            this.config.Region = config.Region;
            this.config.lockRegion = true;
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
            live: this.config.Region,
        };
        this.multifactor = false;
        this.isError = true;
        // first reload
        this.RegionServices = new lib_2.ValRegion(this.region.live).toJSON();
        //services
        this.services = {
            AxiosData: {
                headers: {
                    'Authorization': `${this.token_type} ${this.access_token}`,
                    'X-Riot-Entitlements-JWT': this.entitlements_token,
                    'X-Riot-ClientVersion': this.config.client.version,
                    'X-Riot-ClientPlatform': (0, Uft8_1.toBase64)(JSON.stringify(this.config.client.platform)),
                },
            },
            Region: this.RegionServices,
        };
        //service list
        this.Client = new Client_1.Client(this.services);
        this.Client.on('error', (_data) => { this.emit('error', { errorCode: _data.errorCode, message: _data.message, data: _data.data }); });
        this.Contract = new Contract_1.Contract(this.services);
        this.Contract.on('error', (_data) => { this.emit('error', { errorCode: _data.errorCode, message: _data.message, data: _data.data }); });
        this.CurrentGame = new CurrentGame_1.CurrentGame(this.services);
        this.CurrentGame.on('error', (_data) => { this.emit('error', { errorCode: _data.errorCode, message: _data.message, data: _data.data }); });
        this.Match = new Match_1.Match(this.services);
        this.Match.on('error', (_data) => { this.emit('error', { errorCode: _data.errorCode, message: _data.message, data: _data.data }); });
        this.Party = new Party_1.Party(this.services);
        this.Party.on('error', (_data) => { this.emit('error', { errorCode: _data.errorCode, message: _data.message, data: _data.data }); });
        this.Player = new Player_1.Player(this.services);
        this.Player.on('error', (_data) => { this.emit('error', { errorCode: _data.errorCode, message: _data.message, data: _data.data }); });
        this.Pregame = new PreGame_1.PreGame(this.services);
        this.Pregame.on('error', (_data) => { this.emit('error', { errorCode: _data.errorCode, message: _data.message, data: _data.data }); });
        this.Store = new Store_1.Store(this.services);
        this.Store.on('error', (_data) => { this.emit('error', { errorCode: _data.errorCode, message: _data.message, data: _data.data }); });
        //event
        this.emit('ready');
    }
    //reload
    /**
     * @returns {void}
     */
    reload() {
        this.RegionServices = new lib_2.ValRegion(this.region.live).toJSON();
        //services
        this.services = {
            AxiosData: {
                headers: {
                    'Authorization': `${this.token_type} ${this.access_token}`,
                    'X-Riot-Entitlements-JWT': this.entitlements_token,
                    'X-Riot-ClientVersion': this.config.client.version,
                    'X-Riot-ClientPlatform': (0, Uft8_1.toBase64)(JSON.stringify(this.config.client.platform)),
                },
            },
            Region: this.RegionServices,
        };
        //service list
        this.Client = new Client_1.Client(this.services);
        this.Client.on('error', (_data) => { this.emit('error', { errorCode: _data.errorCode, message: _data.message, data: _data.data }); });
        this.Contract = new Contract_1.Contract(this.services);
        this.Contract.on('error', (_data) => { this.emit('error', { errorCode: _data.errorCode, message: _data.message, data: _data.data }); });
        this.CurrentGame = new CurrentGame_1.CurrentGame(this.services);
        this.CurrentGame.on('error', (_data) => { this.emit('error', { errorCode: _data.errorCode, message: _data.message, data: _data.data }); });
        this.Match = new Match_1.Match(this.services);
        this.Match.on('error', (_data) => { this.emit('error', { errorCode: _data.errorCode, message: _data.message, data: _data.data }); });
        this.Party = new Party_1.Party(this.services);
        this.Party.on('error', (_data) => { this.emit('error', { errorCode: _data.errorCode, message: _data.message, data: _data.data }); });
        this.Player = new Player_1.Player(this.services);
        this.Player.on('error', (_data) => { this.emit('error', { errorCode: _data.errorCode, message: _data.message, data: _data.data }); });
        this.Pregame = new PreGame_1.PreGame(this.services);
        this.Pregame.on('error', (_data) => { this.emit('error', { errorCode: _data.errorCode, message: _data.message, data: _data.data }); });
        this.Store = new Store_1.Store(this.services);
        this.Store.on('error', (_data) => { this.emit('error', { errorCode: _data.errorCode, message: _data.message, data: _data.data }); });
    }
    //save
    toJSON() {
        return {
            cookie: this.cookie.toJSON(),
            access_token: this.access_token,
            token_type: this.token_type,
            entitlements_token: this.entitlements_token,
            region: this.region,
        };
    }
    fromJSON(data) {
        this.cookie = tough_cookie_1.CookieJar.fromJSON(JSON.stringify(data.cookie));
        this.access_token = data.access_token;
        this.token_type = data.token_type;
        this.entitlements_token = data.entitlements_token;
        this.region = data.region;
    }
    //auth
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
    fromJSONAuth(auth) {
        this.cookie = tough_cookie_1.CookieJar.fromJSON(JSON.stringify(auth.cookie));
        this.access_token = auth.access_token;
        this.id_token = auth.id_token;
        this.expires_in = auth.expires_in;
        this.token_type = auth.token_type;
        this.entitlements_token = auth.entitlements_token;
        if (!this.config.lockRegion) {
            this.region = auth.region;
        }
        this.multifactor = auth.multifactor;
        this.isError = auth.isError;
        if (auth.isError) {
            const _error = {
                errorCode: 'ValWrapper_Authentication_Error',
                message: 'Authentication Error',
                data: auth,
            };
            this.emit('error', _error);
        }
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const NewAuth = yield Account_1.Account.login(username, password, this.config.UserAgent);
            this.fromJSONAuth(NewAuth);
            this.reload();
        });
    }
    verify(verificationCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const NewAuth = yield Multifactor_1.Multifactor.verify(this.toJSONAuth(), verificationCode, this.config.UserAgent);
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
        this.region.live = region;
        this.reload();
    }
    /**
    * @param {String} clientVersion Client Version
    * @returns {void}
    */
    setClientVersion(clientVersion = _Client_Version) {
        this.emit('changeSettings', { name: 'client_version', data: clientVersion });
        this.config.client.version = clientVersion;
        this.reload();
    }
    /**
    * @param {ValWrapperClientPlatfrom} clientPlatfrom Client Platfrom in json
    * @returns {void}
    */
    setClientPlatfrom(clientPlatfrom = _Client_Platfrom) {
        this.emit('changeSettings', { name: 'client_platfrom', data: clientPlatfrom });
        this.config.client.platform = clientPlatfrom;
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
    static fromJSON(config, data) {
        const NewClient = new WrapperClient(config);
        NewClient.fromJSON(data);
        return NewClient;
    }
}
exports.WrapperClient = WrapperClient;
//# sourceMappingURL=Client.js.map