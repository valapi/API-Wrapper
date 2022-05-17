//import
import { CustomEvent, toUft8, type ValorantAPIError } from "@valapi/lib";
import { CookieJar } from "tough-cookie";
import type { AxiosRequestConfig } from "axios";

import { ValRegion as WrapperRegion, type ValorantAPIRegion } from "@valapi/lib";
import { Region as _Region } from "@valapi/lib";

import { AxiosClient, type ValWrapperAxiosRequest } from "./AxiosClient";

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
        pbe: string;
        live: string;
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
    region?: keyof typeof _Region;
    client?: {
        version?: string;
        platform?: ValWrapperClientPlatfrom;
    };
    axiosConfig?: AxiosRequestConfig,
}

const _Client_Version = 'release-04.08-shipping-15-701907';
const _Client_Platfrom = {
    "platformType": "PC",
    "platformOS": "Windows",
    "platformOSVersion": "10.0.19042.1.256.64bit",
    "platformChipset": "Unknown"
}

const _defaultConfig: ValWrapperConfig = {
    userAgent: 'RiotClient/43.0.1.41953 86.4190634 rso-auth (Windows; 10;;Professional, x64)',
    region: 'na',
    client: {
        version: _Client_Version,
        platform: _Client_Platfrom,
    },
    axiosConfig: {},
}

//class
class WrapperClient extends CustomEvent {
    //auth
    private cookie: CookieJar;
    private access_token: string;
    private id_token: string;
    private expires_in: number;
    private token_type: string;
    private entitlements_token: string;
    public multifactor: boolean;
    public isError: boolean;

    //region
    private region: {
        pbe: string,
        live: string,
    };

    protected config: ValWrapperConfig;
    protected lockRegion: boolean;

    //reload
    private RegionServices: ValorantAPIRegion;
    private AxiosClient: AxiosClient;

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

    constructor(config: ValWrapperConfig = {}) {
        super();
        //config
        this.config = new Object({ ..._defaultConfig, ...config });

        if (this.config.region) {
            this.lockRegion = true;
        } else {
            this.lockRegion = false;
        }

        if(this.config.region === 'data'){
            this.emit('error', { errorCode: 'ValWrapper_Config_Error', message: 'Region Not Found', data: this.config.region });
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
            live: String(this.config.region),
        };
        this.multifactor = false;
        this.isError = true;

        // first reload
        this.RegionServices = new WrapperRegion(this.region.live as keyof typeof _Region).toJSON();

        const _axiosConfig: AxiosRequestConfig = {
            headers: {
                'Authorization': `${this.token_type} ${this.access_token}`,
                'X-Riot-Entitlements-JWT': this.entitlements_token,
                'X-Riot-ClientVersion': String(this.config.client?.version),
                'X-Riot-ClientPlatform': toUft8(JSON.stringify(this.config.client?.platform)),
            }
        }
        this.AxiosClient = new AxiosClient(new Object({ ..._axiosConfig, ...this.config.axiosConfig }));
        this.AxiosClient.on('error', ((data:ValorantAPIError) => { this.emit('error', data as ValorantAPIError); }));
        this.AxiosClient.on('request', ((data:ValWrapperAxiosRequest) => { this.emit('request', data as ValWrapperAxiosRequest); }));

        //service
        this.Contract = new ContractService(this.AxiosClient, this.RegionServices);
        this.CurrentGame = new CurrentGameService(this.AxiosClient, this.RegionServices);
        this.Party = new PartyService(this.AxiosClient, this.RegionServices);
        this.Pregame = new PreGameService(this.AxiosClient, this.RegionServices);
        this.Session = new SessionService(this.AxiosClient, this.RegionServices);
        this.Store = new StoreService(this.AxiosClient, this.RegionServices);

        this.Client = new ClientService(this.AxiosClient, this.RegionServices);
        this.Match = new MatchService(this.AxiosClient, this.RegionServices);
        this.MMR = new MMRService(this.AxiosClient, this.RegionServices);
        this.Player = new PlayerService(this.AxiosClient, this.RegionServices, String(this.config.userAgent));

        //event
        this.emit('ready');
    }

    //reload

    /**
     * @returns {void}
     */
    private reload(): void {
        this.RegionServices = new WrapperRegion(this.region.live as keyof typeof _Region).toJSON();

        const _axiosConfig: AxiosRequestConfig = {
            headers: {
                'Authorization': `${this.token_type} ${this.access_token}`,
                'X-Riot-Entitlements-JWT': this.entitlements_token,
                'X-Riot-ClientVersion': String(this.config.client?.version),
                'X-Riot-ClientPlatform': toUft8(JSON.stringify(this.config.client?.platform)),
            }
        }
        this.AxiosClient = new AxiosClient(new Object({ ..._axiosConfig, ...this.config.axiosConfig }));
        this.AxiosClient.on('error', ((data:ValorantAPIError) => { this.emit('error', data as ValorantAPIError); }));
        this.AxiosClient.on('request', ((data:ValWrapperAxiosRequest) => { this.emit('request', data as ValWrapperAxiosRequest); }));

        //service
        this.Contract = new ContractService(this.AxiosClient, this.RegionServices);
        this.CurrentGame = new CurrentGameService(this.AxiosClient, this.RegionServices);
        this.Party = new PartyService(this.AxiosClient, this.RegionServices);
        this.Pregame = new PreGameService(this.AxiosClient, this.RegionServices);
        this.Session = new SessionService(this.AxiosClient, this.RegionServices);
        this.Store = new StoreService(this.AxiosClient, this.RegionServices);

        this.Client = new ClientService(this.AxiosClient, this.RegionServices);
        this.Match = new MatchService(this.AxiosClient, this.RegionServices);
        this.MMR = new MMRService(this.AxiosClient, this.RegionServices);
        this.Player = new PlayerService(this.AxiosClient, this.RegionServices, String(this.config.userAgent));

        //event
        this.emit('ready');
    }

    //save

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

    public fromJSON(data: ValWrapperClient): void {
        if(!data.cookie){
            data.cookie = new CookieJar().toJSON();
        }

        if(!data.token_type){
            data.token_type = 'Bearer';
        }

        this.cookie = CookieJar.fromJSON(JSON.stringify(data.cookie));
        this.access_token = data.access_token;
        this.id_token = data.id_token || '';
        this.token_type = data.token_type;
        this.entitlements_token = data.entitlements_token;
        this.region = data.region;

        if (this.region.live) {
            this.lockRegion = true;
        }

        this.reload();
    }

    //auth

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

    public fromJSONAuth(auth: ValWrapperAuth): void {
        this.cookie = CookieJar.fromJSON(JSON.stringify(auth.cookie));
        this.access_token = auth.access_token;
        this.id_token = auth.id_token;
        this.expires_in = auth.expires_in;
        this.token_type = auth.token_type;
        this.entitlements_token = auth.entitlements_token;
        if (!this.lockRegion) {
            this.region = auth.region;
        }
        this.multifactor = auth.multifactor;
        this.isError = auth.isError;

        if (auth.isError) {
            this.emit('error', {
                errorCode: 'ValWrapper_Authentication_Error',
                message: 'Authentication Error',
                data: auth,
            });
        }

        this.reload();
    }

    public async login(username: string, password: string): Promise<void> {
        const NewAuth: ValWrapperAuth = await ClientAuthAccount.login(this.toJSONAuth(), username, password, String(this.config.userAgent), String(this.config.client?.version), String(this.config.client?.platform));

        this.fromJSONAuth(NewAuth);
        this.reload();
    }

    public async verify(verificationCode: number): Promise<void> {
        const NewAuth: ValWrapperAuth = await ClientAuthMultifactor.verify(this.toJSONAuth(), verificationCode, String(this.config.userAgent), String(this.config.client?.version), String(this.config.client?.platform));

        this.fromJSONAuth(NewAuth);
        this.reload();
    }

    //settings
    
    /**
    * @param {String} region Region
    * @returns {void}
    */
     public setRegion(region:keyof typeof _Region):void {
        this.emit('changeSettings', { name: 'region', data: region });

        this.region.live = region;
        this.reload();
    }

    /**
    * @param {String} clientVersion Client Version
    * @returns {void}
    */
    public setClientVersion(clientVersion:string = _Client_Version):void {
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
    public setClientPlatfrom(clientPlatfrom:ValWrapperClientPlatfrom = _Client_Platfrom):void {
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
    public setCookie(cookie:CookieJar.Serialized):void {
        this.emit('changeSettings', { name: 'cookie', data: cookie });

        this.cookie = CookieJar.fromJSON(JSON.stringify(cookie));
        this.reload();
    }

    //static

    public static fromJSON(config: ValWrapperConfig, data: ValWrapperClient): WrapperClient {
        const NewClient: WrapperClient = new WrapperClient(config);
        NewClient.fromJSON(data);

        NewClient.expires_in = 3600;
        NewClient.multifactor = false;
        NewClient.isError = false;

        return NewClient;
    }

    public static async fromCookie(config: ValWrapperConfig, data: ValWrapperAuth): Promise<WrapperClient> {
        const CookieAuthData:ValWrapperAuth = {
            cookie: data.cookie,
            access_token: data.access_token,
            id_token: data.id_token,
            expires_in: data.expires_in,
            token_type: data.token_type,
            entitlements_token: data.entitlements_token,
            region: data.region,
            multifactor: data.multifactor,
            isError: data.isError,
        }

        const NewCookieAuth = await ClientAuthCookie.reauth(CookieAuthData, String(config.userAgent), _Client_Version, toUft8(JSON.stringify(_Client_Platfrom)));

        return WrapperClient.fromJSON(config, NewCookieAuth);
    }
}

//event
interface ValWrapperClientEvent {
    'ready': () => void,
    'request': (data:ValWrapperAxiosRequest) => void,
    'changeSettings': (data: { name:string, data:any }) => void,
    'error': (data: ValorantAPIError) => void;
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