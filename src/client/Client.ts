//import
import { ValEvent, toUft8, type ValorantApiError } from "@valapi/lib";
import { CookieJar } from "tough-cookie";
import type { AxiosRequestConfig } from "axios";

import {
    ValRegion as ValRegion, type ValorantApiRegion,
    ValRequestClient, type ValorantApiRequestData,
} from "@valapi/lib";
import { Region as _Region } from "@valapi/lib";
import { HttpsCookieAgent, HttpCookieAgent } from "http-cookie-agent";

import { Account as ClientAuthAccount, type ValWrapperAuth, type ValWrapperAuthExtend } from "../auth/Account";
import { Multifactor as ClientAuthMultifactor } from "../auth/Multifactor";
import { CookieAuth as ClientAuthCookie } from "../auth/CookieAuth";

//service
import { Contract as ContractService } from "../service/Contract";
import { CurrentGame as CurrentGameService } from "../service/CurrentGame";
import { Party as PartyService } from "../service/Party";
import { PreGame as PreGameService } from "../service/PreGame";
import { Session as SessionService } from "../service/Session";
import { Store as StoreService } from "../service/Store";

import { Client as ClientService } from "../custom/Client";
import { Match as MatchService } from "../custom/Match";
import { MMR as MMRService } from "../custom/MMR";
import { Player as PlayerService } from "../custom/Player";

//interface

interface ValWrapperClient {
    cookie: CookieJar.Serialized;
    access_token: string;
    id_token?: string;
    token_type?: string;
    entitlements_token: string;
    region: {
        pbe: string,
        live: string,
    };
    createAt: {
        cookie: number,
        token: number,
    };
}

interface ValWrapperClientPlatfrom {
    "platformType": string;
    "platformOS": string;
    "platformOSVersion": string;
    "platformChipset": string;
}

interface ValWrapperConfig {
    userAgent?: string;
    region?: keyof typeof _Region.from;
    client?: {
        version?: string,
        platform?: ValWrapperClientPlatfrom,
    };
    forceAuth?: boolean;
    axiosConfig?: AxiosRequestConfig;
    expiresIn?: {
        cookie: number,
        token?: number,
    };
    selfAuthentication?: {
        username: string | Function,
        password: string | Function,
        verifyCode?: string | number | Function,
    };
}

const _Client_Version = 'release-05.00-shipping-6-725355';
const _Client_Platfrom = {
    "platformType": "PC",
    "platformOS": "Windows",
    "platformOSVersion": "10.0.19042.1.256.64bit",
    "platformChipset": "Unknown",
};

const _defaultConfig: ValWrapperConfig = {
    userAgent: 'RiotClient/43.0.1.41953 86.4190634 rso-auth (Windows; 10;;Professional, x64)',
    region: 'na',
    client: {
        version: _Client_Version,
        platform: _Client_Platfrom,
    },
    forceAuth: false,
    axiosConfig: {},
    expiresIn: { //Milliseconds
        cookie: 2592000000,
        token: 3600000,
    },
};

//class

class WrapperClient extends ValEvent {
    public reloadTimes: number = 0;
    public reconnectTimes: number = 0;

    //auth
    private cookie: CookieJar;
    private access_token: string;
    private id_token: string;
    private expires_in: number;
    private token_type: string;
    private entitlements_token: string;
    public multifactor: boolean;
    public isError: boolean;

    public createAt: {
        cookie: number,
        token: number,
    };

    //region
    private region: {
        pbe: string,
        live: string,
    };

    protected config: ValWrapperConfig;
    protected lockRegion: boolean;

    //reload
    private axiosConfig: AxiosRequestConfig;
    private RegionServices: ValorantApiRegion;
    private RequestClient: ValRequestClient;

    //service
    public Contract: ContractService;
    public CurrentGame: CurrentGameService;
    public Party: PartyService;
    public Pregame: PreGameService;
    public Session: SessionService;
    public Store: StoreService;

    public Client: ClientService;
    public Match: MatchService;
    public MMR: MMRService;
    public Player: PlayerService;

    /**
     * Create a new Valorant API Wrapper Client
     * @param {ValWrapperConfig} config Client Config
     */
    public constructor(config: ValWrapperConfig = {}) {
        super();

        //config
        this.config = new Object({ ..._defaultConfig, ...config });

        if (config.region) {
            this.lockRegion = true;
        } else {
            this.lockRegion = false;
        }

        if (!this.config.region) {
            this.config.region = 'na';
        }

        //create without auth
        this.cookie = new CookieJar();
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

        this.createAt = {
            cookie: new Date().getTime(),
            token: new Date().getTime(),
        };

        // first reload
        if (this.lockRegion === true && this.config.region) {
            this.region.live = this.config.region;
        }

        this.RegionServices = new ValRegion(this.region.live as keyof typeof _Region.from).toJSON();

        //request client
        
        //cipher suite: https://developers.cloudflare.com/ssl/ssl-tls/cipher-suites/
        const ciphers: Array<string> = [
            'TLS_AES_128_GCM_SHA256',
            'TLS_AES_256_GCM_SHA384',
            'TLS_AES_128_CCM_8_SHA256', //extra tls 1.3 (https://developer.ibm.com/blogs/migrating-to-tls13-in-nodejs)
            'TLS_AES_128_CCM_SHA256', //extra tls 1.3 (https://developer.ibm.com/blogs/migrating-to-tls13-in-nodejs)
            'TLS_CHACHA20_POLY1305_SHA256',
            'TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256'
        ];
        const _normalAxiosConfig: AxiosRequestConfig = {
            headers: {
                'Authorization': `${this.token_type} ${this.access_token}`,
                'X-Riot-Entitlements-JWT': this.entitlements_token,
                'X-Riot-ClientVersion': String(this.config.client?.version),
                'X-Riot-ClientPlatform': toUft8(JSON.stringify(this.config.client?.platform)),
            },
            httpsAgent: new HttpsCookieAgent({ jar: this.cookie, keepAlive: true, ciphers: ciphers.join(':'), honorCipherOrder: true, minVersion: 'TLSv1.2', maxVersion: 'TLSv1.3' }),
            httpAgent: new HttpCookieAgent({ jar: this.cookie, keepAlive: true }),
        };
        this.axiosConfig = new Object({ ..._normalAxiosConfig, ...this.config.axiosConfig });
        this.RequestClient = new ValRequestClient(this.axiosConfig);
        this.RequestClient.on('error', ((data: ValorantApiError) => { this.emit('error', data as ValorantApiError); }));
        this.RequestClient.on('request', ((data: ValorantApiRequestData) => { this.emit('request', data as ValorantApiRequestData); }));

        //service
        this.Contract = new ContractService(this.RequestClient, this.RegionServices);
        this.CurrentGame = new CurrentGameService(this.RequestClient, this.RegionServices);
        this.Party = new PartyService(this.RequestClient, this.RegionServices);
        this.Pregame = new PreGameService(this.RequestClient, this.RegionServices);
        this.Session = new SessionService(this.RequestClient, this.RegionServices);
        this.Store = new StoreService(this.RequestClient, this.RegionServices);

        this.Client = new ClientService(this.RequestClient, this.RegionServices);
        this.Match = new MatchService(this.RequestClient, this.RegionServices);
        this.MMR = new MMRService(this.RequestClient, this.RegionServices);
        this.Player = new PlayerService(this.RequestClient, this.RegionServices, String(this.config.userAgent));

        //event
        this.emit('ready');
    }

    //reload

    /**
     * Reload Class
     * @returns {void}
     */
    private reload(): void {
        this.reloadTimes + 1;

        if (this.lockRegion === true && this.config.region) {
            this.region.live = this.config.region;
        }

        this.RegionServices = new ValRegion(this.region.live as keyof typeof _Region.from).toJSON();

        //request client
        const ciphers: Array<string> = [
            'TLS_CHACHA20_POLY1305_SHA256',
            'TLS_AES_128_GCM_SHA256',
            'TLS_AES_256_GCM_SHA384',
            'TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256'
        ];
        const _normalAxiosConfig: AxiosRequestConfig = {
            headers: {
                'Authorization': `${this.token_type} ${this.access_token}`,
                'X-Riot-Entitlements-JWT': this.entitlements_token,
                'X-Riot-ClientVersion': String(this.config.client?.version),
                'X-Riot-ClientPlatform': toUft8(JSON.stringify(this.config.client?.platform)),
            },
            httpsAgent: new HttpsCookieAgent({ jar: this.cookie, keepAlive: true, ciphers: ciphers.join(':'), honorCipherOrder: true, minVersion: 'TLSv1.2', maxVersion: 'TLSv1.3' }),
            httpAgent: new HttpCookieAgent({ jar: this.cookie, keepAlive: true }),
        };
        this.axiosConfig = new Object({ ..._normalAxiosConfig, ...this.config.axiosConfig });
        this.RequestClient = new ValRequestClient(this.axiosConfig);
        this.RequestClient.on('error', ((data: ValorantApiError) => { this.emit('error', data as ValorantApiError); }));
        this.RequestClient.on('request', ((data: ValorantApiRequestData) => { this.emit('request', data as ValorantApiRequestData); }));

        //service
        this.Contract = new ContractService(this.RequestClient, this.RegionServices);
        this.CurrentGame = new CurrentGameService(this.RequestClient, this.RegionServices);
        this.Party = new PartyService(this.RequestClient, this.RegionServices);
        this.Pregame = new PreGameService(this.RequestClient, this.RegionServices);
        this.Session = new SessionService(this.RequestClient, this.RegionServices);
        this.Store = new StoreService(this.RequestClient, this.RegionServices);

        this.Client = new ClientService(this.RequestClient, this.RegionServices);
        this.Match = new MatchService(this.RequestClient, this.RegionServices);
        this.MMR = new MMRService(this.RequestClient, this.RegionServices);
        this.Player = new PlayerService(this.RequestClient, this.RegionServices, String(this.config.userAgent));

        //event
        this.emit('ready');
    }

    /**
     * Reconnect to the server
     * @param {Boolean} force Force to reconnect
     */
    public async reconnect(force?: Boolean): Promise<void> {
        if ((new Date().getTime()) >= (this.createAt.cookie + Number(this.config.expiresIn?.cookie))) {
            //event
            this.emit('expires', {
                name: 'cookie',
                data: this.cookie,
            });
            this.cookie = new CookieJar();
            //uptodate
            if (this.config.expiresIn && this.config.expiresIn.cookie <= 0) {
                this.config.expiresIn.cookie = _defaultConfig.expiresIn?.cookie as number;
            }
            this.createAt = {
                cookie: new Date().getTime(),
                token: new Date().getTime(),
            };
            //auto
            if (this.config.selfAuthentication) {
                await this.login(this.config.selfAuthentication.username, this.config.selfAuthentication.password);
                this.reconnectTimes + 1;

                if (this.multifactor && this.config.selfAuthentication.verifyCode) {
                    await this.verify(this.config.selfAuthentication.verifyCode);
                } else if (this.multifactor) {
                    this.emit('error', {
                        errorCode: 'ValWrapper_Authentication_Error',
                        message: 'Missing verifyCode at autoAuthentication',
                        data: this.config.selfAuthentication,
                    });
                }
            } else if (!this.config.forceAuth) {
                this.emit('error', {
                    errorCode: 'ValWrapper_Expired_Cookie',
                    message: 'Cookie Expired',
                    data: this.createAt.cookie,
                });
            }
        }

        if ((new Date().getTime()) >= (this.createAt.token + Number(this.config.expiresIn?.token)) || force === true) {
            //event
            this.emit('expires', {
                name: 'token',
                data: this.access_token,
            });
            this.access_token = '';
            //uptodate
            if (this.config.expiresIn && Number(this.config.expiresIn.token) <= 0) {
                this.config.expiresIn.token = _defaultConfig.expiresIn?.token as number;
            }
            this.createAt.token = new Date().getTime();
            //auto
            await this.fromCookie();
            this.reconnectTimes + 1;
        }
    }

    //save

    /**
     * 
     * @returns {ValWrapperClient}
     */
    public toJSON(): ValWrapperClient {
        return {
            cookie: this.cookie.toJSON(),
            access_token: this.access_token,
            id_token: this.id_token,
            token_type: this.token_type,
            entitlements_token: this.entitlements_token,
            region: this.region,
            createAt: this.createAt,
        };
    }

    /**
     * 
     * @param {ValWrapperClient} data Client `.toJSON()` data
     * @returns {void}
     */
    public fromJSON(data: ValWrapperClient): void {
        if (!data.id_token) {
            data.id_token = '';
        }

        if (!data.token_type) {
            data.token_type = 'Bearer';
        }

        this.cookie = CookieJar.fromJSON(JSON.stringify(data.cookie));
        this.access_token = data.access_token;
        this.id_token = data.id_token;
        this.token_type = data.token_type;
        this.entitlements_token = data.entitlements_token;
        this.region = data.region;
        this.createAt = data.createAt;

        this.reload();
    }

    //auth

    /**
     * 
     * @returns {ValWrapperAuth}
     */
    public toJSONAuth(): ValWrapperAuth {
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
    public fromJSONAuth(auth: ValWrapperAuth): void {
        this.cookie = CookieJar.fromJSON(JSON.stringify(auth.cookie));
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

        this.createAt = {
            cookie: new Date().getTime(),
            token: new Date().getTime(),
        };

        this.reload();
    }

    /**
     * * Not Recommend to use
     * @param {CookieJar} cookie Client Cookie
     * @returns {Promise<void>}
     */
    public async fromCookie(cookie?: CookieJar): Promise<void> {
        if (cookie) {
            this.cookie = cookie;
        }

        const _extraData: ValWrapperAuthExtend = {
            UserAgent: String(this.config.userAgent),
            clientVersion: String(this.config.client?.version),
            clientPlatform: toUft8(JSON.stringify(this.config.client?.platform)),
            RequestClient: this.RequestClient,
            lockRegion: this.lockRegion,
        };
        const NewCookieAuth = await ClientAuthCookie.reauth(this.toJSONAuth(), _extraData, this.axiosConfig);

        this.fromJSONAuth(NewCookieAuth);
    }

    /**
     * Login to Riot Account
     * @param {String} username Username
     * @param {String} password Password
     * @returns {Promise<void>}
     */
    public async login(username: string | Function, password: string | Function): Promise<void> {
        if (typeof username === 'function') {
            username = (await username()) as string;
        }

        if (typeof password === 'function') {
            password = (await password()) as string;
        }

        const _extraData: ValWrapperAuthExtend = {
            UserAgent: String(this.config.userAgent),
            clientVersion: String(this.config.client?.version),
            clientPlatform: toUft8(JSON.stringify(this.config.client?.platform)),
            RequestClient: this.RequestClient,
            lockRegion: this.lockRegion,
        };
        const NewAuth: ValWrapperAuth = await ClientAuthAccount.login(this.toJSONAuth(), username, password, _extraData);

        this.fromJSONAuth(NewAuth);

        if (this.multifactor) {
            if (this.config.selfAuthentication && !this.config.selfAuthentication?.verifyCode) {
                throw new Error(
                    'Multifactor is not supported when selfAuthentication.verifyCode is not set',
                );
            }
        }
    }

    /**
     * Multi-Factor Authentication
     * @param {number} verificationCode Verification Code
     * @returns {Promise<void>}
     */
    public async verify(verificationCode: number | string | Function): Promise<void> {
        if (typeof verificationCode === 'function') {
            verificationCode = (await verificationCode()) as number | string;
        }

        const _extraData: ValWrapperAuthExtend = {
            UserAgent: String(this.config.userAgent),
            clientVersion: String(this.config.client?.version),
            clientPlatform: toUft8(JSON.stringify(this.config.client?.platform)),
            RequestClient: this.RequestClient,
            lockRegion: this.lockRegion,
        };
        const NewAuth: ValWrapperAuth = await ClientAuthMultifactor.verify(this.toJSONAuth(), Number(verificationCode), _extraData);

        this.fromJSONAuth(NewAuth);
    }

    //settings

    /**
     * @param {String} region Region
     * @returns {void}
     */
    public setRegion(region: keyof typeof _Region.from): void {
        this.emit('changeSettings', { name: 'region', data: region });

        this.config.region = region;
        this.region.live = region;
        this.reload();
    }

    /**
     * @param {String} clientVersion Client Version
     * @returns {void}
     */
    public setClientVersion(clientVersion: string = _Client_Version): void {
        this.emit('changeSettings', { name: 'client_version', data: clientVersion });

        this.config.client = {
            version: clientVersion,
            platform: this.config.client?.platform,
        };
        this.reload();
    }

    /**
     * @param {ValWrapperClientPlatfrom} clientPlatfrom Client Platfrom in json
     * @returns {void}
     */
    public setClientPlatfrom(clientPlatfrom: ValWrapperClientPlatfrom = _Client_Platfrom): void {
        this.emit('changeSettings', { name: 'client_platfrom', data: clientPlatfrom });

        this.config.client = {
            version: this.config.client?.version,
            platform: clientPlatfrom,
        };
        this.reload();
    }

    /**
     * @param {CookieJar.Serialized} cookie Cookie
     * @returns {void}
     */
    public setCookie(cookie: CookieJar.Serialized): void {
        this.emit('changeSettings', { name: 'cookie', data: cookie });

        this.cookie = CookieJar.fromJSON(JSON.stringify(cookie));
        this.reload();
    }

    //static

    /**
     * * Something went wrong? try to not use static methods.
     * @param {ValWrapperConfig} config Client Config
     * @param {ValWrapperClient} data Client `.toJSON()` data
     * @returns {WrapperClient}
     */
    public static fromJSON(config: ValWrapperConfig, data: ValWrapperClient): WrapperClient {
        const NewClient: WrapperClient = new WrapperClient(config);
        NewClient.fromJSON(data);

        if (config.region) {
            NewClient.setRegion(config.region);
        } else if (data.region.live) {
            NewClient.setRegion(data.region.live as keyof typeof _Region.from);
        }

        NewClient.reconnectTimes = 1;

        return NewClient;
    }
}

//event
interface ValWrapperEventExpire {
    'cookie': CookieJar;
    'token': string;
}

interface ValWrapperEventSettings {
    'region': string;
    'client_version': string;
    'client_platfrom': ValWrapperClientPlatfrom;
    'cookie': CookieJar.Serialized;
}

interface ValWrapperClientEvent {
    'ready': () => void;
    'expires': <ExpireName extends keyof ValWrapperEventExpire>(data: { name: ExpireName, data: ValWrapperEventExpire[ExpireName] }) => void;
    'request': (data: ValorantApiRequestData) => void;
    'changeSettings': <SettingName extends keyof ValWrapperEventSettings>(data: { name: SettingName, data: ValWrapperEventSettings[SettingName] }) => void;
    'error': (data: ValorantApiError) => void;
}

declare interface WrapperClient {
    emit<EventName extends keyof ValWrapperClientEvent>(name: EventName, ...args: Parameters<ValWrapperClientEvent[EventName]>): void;
    on<EventName extends keyof ValWrapperClientEvent>(name: EventName, callback: ValWrapperClientEvent[EventName]): void;
    once<EventName extends keyof ValWrapperClientEvent>(name: EventName, callback: ValWrapperClientEvent[EventName]): void;
    off<EventName extends keyof ValWrapperClientEvent>(name: EventName, callback?: ValWrapperClientEvent[EventName]): void;
}

//export
export { WrapperClient };
export type { ValWrapperClient, ValWrapperClientPlatfrom, ValWrapperConfig, ValWrapperEventExpire, ValWrapperEventSettings, ValWrapperClientEvent };