//import
import { ValEvent, toUft8, type ValorantApiError } from "@valapi/lib";
import { CookieJar } from "tough-cookie";
import type { AxiosRequestConfig } from "axios";

import {
    ValRegion as ValRegion, type ValorantApiRegion,
    ValRequestClient, type ValorantApiRequestData,
} from "@valapi/lib";
import { Region as _Region } from "@valapi/lib";
import { HttpsCookieAgent } from "http-cookie-agent";

import { Account as ClientAuthAccount, type ValWrapperAuth } from "../auth/Account";
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
    cookie?: CookieJar.Serialized;
    access_token: string;
    id_token?: string;
    token_type?: string;
    entitlements_token: string;
    region: {
        pbe: string,
        live: string,
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
    autoReconnect?: boolean;
    autoAuthentication?: {
        username: string,
        password: string,
    };
}

const _Client_Version = 'release-04.10-shipping-5-714978';
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
    expiresIn: {
        cookie: 2592000000,
        token: 3600000,
    }, //Milliseconds
    autoReconnect: false,
};

//class

class WrapperClient extends ValEvent {
    
    //auth
    private cookie: CookieJar;
    private access_token: string;
    private id_token: string;
    private expires_in: number;
    private token_type: string;
    private entitlements_token: string;
    public multifactor: boolean;
    public isError: boolean;

    public expireAt: {
        cookie: Date,
        token: Date,
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

        this.expireAt = {
            cookie: new Date(Date.now() + Number(this.config.expiresIn?.cookie)),
            token: new Date(Date.now() + (this.config.expiresIn?.token || this.expires_in * 1000)),
        };

        // first reload
        if(this.lockRegion === true && this.config.region){
            this.region.live = this.config.region;
        }
            
        this.RegionServices = new ValRegion(this.region.live as keyof typeof _Region.from).toJSON();
        
        //expire
        if(new Date() >= this.expireAt.cookie) {
            this.emit('expires', {
                name: 'cookie',
                data: this.cookie,
            });
            this.cookie = new CookieJar();

            if (this.config.autoAuthentication) {
                if(this.multifactor) {
                    throw new Error(
                        'Multifactor is not supported when autoAuthentication is enabled.'
                    );
                }

                let _username = this.config.autoAuthentication.username;
                let _password = this.config.autoAuthentication.password;
                (async () => { await this.login(_username, _password) })();
            } else {
                this.emit('error', {
                    errorCode: 'ValWrapper_Expired_Cookie',
                    message: 'Cookie Expired',
                    data: this.expireAt,
                });
            }
        }
        if(new Date() >= this.expireAt.token) {
            this.emit('expires', {
                name: 'token',
                data: this.access_token,
            });
            this.access_token = '';
            this.id_token = '';
            this.token_type = '';

            if (this.config.autoReconnect === true) {
                (async () => { await this.fromCookie() })();
            } else {
                this.emit('error', {
                    errorCode: 'ValWrapper_Expired_Token',
                    message: 'Token expired',
                    data: this.expireAt,
                });
            }
        }

        //request client
        const ciphers:Array<string> = [
            'TLS_CHACHA20_POLY1305_SHA256',
            'TLS_AES_128_GCM_SHA256',
            'TLS_AES_256_GCM_SHA384',
            'TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256'
        ];
        const _normalAxiosConfig:AxiosRequestConfig = {
            headers: {
                'Authorization': `${this.token_type} ${this.access_token}`,
                'X-Riot-Entitlements-JWT': this.entitlements_token,
                'X-Riot-ClientVersion': String(this.config.client?.version),
                'X-Riot-ClientPlatform': toUft8(JSON.stringify(this.config.client?.platform)),
            },
            httpsAgent: new HttpsCookieAgent({ jar: this.cookie, keepAlive: true, ciphers: ciphers.join(':'), honorCipherOrder: true, minVersion: 'TLSv1.2' }),
        };
        this.axiosConfig = new Object({ ..._normalAxiosConfig, ...this.config.axiosConfig });
        this.RequestClient = new ValRequestClient(this.axiosConfig);
        this.RequestClient.on('error', ((data: ValorantApiError) => { this.emit('error', data as ValorantApiError); }));
        this.RequestClient.on('request', ((data: ValorantApiRequestData) => { this.emit('request', data as ValorantApiRequestData); if(this.config.autoReconnect === true){ this.reload(); } }));

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
        if(this.lockRegion === true && this.config.region){
            this.region.live = this.config.region;
        }
            
        this.RegionServices = new ValRegion(this.region.live as keyof typeof _Region.from).toJSON();
        
        //expire
        if(new Date() >= this.expireAt.cookie) {
            this.emit('expires', {
                name: 'cookie',
                data: this.cookie,
            });
            this.cookie = new CookieJar();

            if (this.config.autoAuthentication) {
                let _username = this.config.autoAuthentication.username;
                let _password = this.config.autoAuthentication.password;
                (async () => { await this.login(_username, _password) })();
            } else {
                this.emit('error', {
                    errorCode: 'ValWrapper_Expired_Cookie',
                    message: 'Cookie Expired',
                    data: this.expireAt,
                });
            }
        }
        if(new Date() >= this.expireAt.token) {
            this.emit('expires', {
                name: 'token',
                data: this.access_token,
            });
            this.access_token = '';

            if (this.config.autoReconnect === true) {
                (async () => { await this.fromCookie() })();
            } else {
                this.emit('error', {
                    errorCode: 'ValWrapper_Expired_Token',
                    message: 'Token expired',
                    data: this.expireAt,
                });
            }
        }

        //request client
        const ciphers:Array<string> = [
            'TLS_CHACHA20_POLY1305_SHA256',
            'TLS_AES_128_GCM_SHA256',
            'TLS_AES_256_GCM_SHA384',
            'TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256'
        ];
        const _normalAxiosConfig:AxiosRequestConfig = {
            headers: {
                'Authorization': `${this.token_type} ${this.access_token}`,
                'X-Riot-Entitlements-JWT': this.entitlements_token,
                'X-Riot-ClientVersion': String(this.config.client?.version),
                'X-Riot-ClientPlatform': toUft8(JSON.stringify(this.config.client?.platform)),
            },
            httpsAgent: new HttpsCookieAgent({ jar: this.cookie, keepAlive: true, ciphers: ciphers.join(':'), honorCipherOrder: true, minVersion: 'TLSv1.2' }),
        };
        this.axiosConfig = new Object({ ..._normalAxiosConfig, ...this.config.axiosConfig });
        this.RequestClient = new ValRequestClient(this.axiosConfig);
        this.RequestClient.on('error', ((data: ValorantApiError) => { this.emit('error', data as ValorantApiError); }));
        this.RequestClient.on('request', ((data: ValorantApiRequestData) => { this.emit('request', data as ValorantApiRequestData); if(this.config.autoReconnect === true){ this.reload(); } }));

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
        };
    }

    /**
     * 
     * @param {ValWrapperClient} data Client `.toJSON()` data
     * @returns {void}
     */
    public fromJSON(data: ValWrapperClient): void {
        if (!data.cookie) {
            data.cookie = new CookieJar().toJSON();
        }

        if (!data.token_type) {
            data.token_type = 'Bearer';
        }

        this.cookie = CookieJar.fromJSON(JSON.stringify(data.cookie));
        this.access_token = data.access_token;
        this.id_token = data.id_token || '';
        this.token_type = data.token_type;
        this.entitlements_token = data.entitlements_token;
        this.region = data.region;

        this.expireAt = {
            cookie: new Date(Date.now() + Number(this.config.expiresIn?.cookie)),
            token: new Date(Date.now() + (this.config.expiresIn?.token || this.expires_in * 1000)),
        };

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

        if(!this.region.live) {
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

        this.expireAt = {
            cookie: new Date(Date.now() + Number(this.config.expiresIn?.cookie)),
            token: new Date(Date.now() + (this.config.expiresIn?.token || this.expires_in * 1000)),
        };

        this.reload();
    }

    /**
     * * Not Recommend to use
     * @returns {Promise<void>}
     */
     public async fromCookie(): Promise<void> {
        const NewCookieAuth = await ClientAuthCookie.reauth(this.toJSONAuth(), String(this.config.userAgent), String(this.config.client?.version), toUft8(JSON.stringify(this.config.client?.platform)), this.RequestClient, this.axiosConfig);

        this.fromJSONAuth(NewCookieAuth);
    }

    /**
     * Login to Riot Account
     * @param {String} username Username
     * @param {String} password Password
     * @returns {Promise<void>}
     */
    public async login(username: string, password: string): Promise<void> {
        const NewAuth: ValWrapperAuth = await ClientAuthAccount.login(this.toJSONAuth(), username, password, String(this.config.userAgent), String(this.config.client?.version), toUft8(JSON.stringify(this.config.client?.platform)), this.RequestClient);

        this.fromJSONAuth(NewAuth);

        if(this.multifactor && this.config.autoAuthentication) {
            throw new Error(
                'Multifactor is not supported when autoAuthentication is enabled.'
            );
        }
    }

    /**
     * Multi-Factor Authentication
     * @param {number} verificationCode Verification Code
     * @returns {Promise<void>}
     */
    public async verify(verificationCode: number | string): Promise<void> {
        const NewAuth: ValWrapperAuth = await ClientAuthMultifactor.verify(this.toJSONAuth(), Number(verificationCode), String(this.config.userAgent), String(this.config.client?.version), toUft8(JSON.stringify(this.config.client?.platform)), this.RequestClient);

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

        if(config.region) {
            NewClient.setRegion(config.region);
        } else if (data.region.live) {
            NewClient.setRegion(data.region.live as keyof typeof _Region.from);
        }

        return NewClient;
    }
}

//event
interface ValWrapperClientEvent {
    'ready': () => void;
    'expires': (data: { name: string, data: any }) => void;
    'request': (data: ValorantApiRequestData) => void;
    'changeSettings': (data: { name: string, data: any }) => void;
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
export type { ValWrapperClient, ValWrapperClientPlatfrom, ValWrapperConfig, ValWrapperClientEvent };