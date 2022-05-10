//import
import { CustomEvent, toUft8 } from "@valapi/lib";
import { CookieJar } from "tough-cookie";

import { ValRegion as WrapperRegion, type ValorantAPIRegion } from "@valapi/lib";
import { Region as _Region } from "@valapi/lib";

import { AxiosClient, type ValWrapperAxiosError } from "./AxiosClient";

import { Account as ClientAuthAccount, type ValWrapperAuth } from "../auth/Account";
import { Multifactor as ClientAuthMultifactor } from "../auth/Multifactor";
import { CookieAuth as ClientAuthCookie } from "../auth/CookieAuth";

const _Client_Version = 'release-04.08-shipping-15-701907';
const _Client_Platfrom = {
    "platformType": "PC",
    "platformOS": "Windows",
    "platformOSVersion": "10.0.19042.1.256.64bit",
    "platformChipset": "Unknown"
}

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
    id_token: string;
    token_type: string;
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

interface ValWrapperClientError {
    errorCode: string;
    message: string;
    data: any;
}

interface ValWrapperConfig {
    userAgent?: string;
    region?: keyof typeof _Region;
    client?: {
        version?: string;
        platform?: ValWrapperClientPlatfrom;
    };
    timeout?: number;
}

interface ValWrapperClientConfig {
    userAgent: string;
    region: keyof typeof _Region;
    lockRegion: boolean;
    client: {
        version: string;
        platform: ValWrapperClientPlatfrom;
    };
    timeout: number;
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

    protected config: ValWrapperClientConfig;

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
        if (!config.userAgent) {
            config.userAgent = 'RiotClient/43.0.1.41953 86.4190634 rso-auth (Windows; 10;;Professional, x64)';
        }

        if (!config.client) {
            config.client = {
                version: _Client_Version,
                platform: _Client_Platfrom,
            }
        } else {
            if (!config.client.version) {
                config.client.version = _Client_Version;
            }

            if (!config.client.platform) {
                config.client.platform = _Client_Platfrom;
            }
        }

        if(!config.timeout){
            config.timeout = 60000; // 1 minute (60 * 1000)
        }

        this.config = {
            userAgent: config.userAgent,
            region: 'na',
            client: {
                version: config.client.version as string,
                platform: config.client.platform as ValWrapperClientPlatfrom,
            },
            lockRegion: false,
            timeout: config.timeout,
        };

        if (config.region) {
            this.config.region = config.region as keyof typeof _Region;
            this.config.lockRegion = true;
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
        this.isError = true;

        // first reload
        this.RegionServices = new WrapperRegion(this.region.live as keyof typeof _Region).toJSON();

        this.AxiosClient = new AxiosClient({
            headers: {
                'Authorization': `${this.token_type} ${this.access_token}`,
                'X-Riot-Entitlements-JWT': this.entitlements_token,
                'X-Riot-ClientVersion': this.config.client.version,
                'X-Riot-ClientPlatform': toUft8(JSON.stringify(this.config.client.platform)),
            },
            timeout: this.config.timeout,
        });
        this.AxiosClient.on('error', ((data:ValWrapperAxiosError) => { this.emit('error', data as ValWrapperClientError); }));

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
        this.Player = new PlayerService(this.AxiosClient, this.RegionServices, this.config.userAgent);

        //event
        this.emit('ready');
    }

    //reload

    /**
     * @returns {void}
     */
    private reload(): void {
        this.RegionServices = new WrapperRegion(this.region.live as keyof typeof _Region).toJSON();

        this.AxiosClient = new AxiosClient({
            headers: {
                'Authorization': `${this.token_type} ${this.access_token}`,
                'X-Riot-Entitlements-JWT': this.entitlements_token,
                'X-Riot-ClientVersion': this.config.client.version,
                'X-Riot-ClientPlatform': toUft8(JSON.stringify(this.config.client.platform)),
            },
            timeout: this.config.timeout,
        });
        this.AxiosClient.on('error', ((data:ValWrapperAxiosError) => { this.emit('error', data as ValWrapperClientError); }));

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
        this.Player = new PlayerService(this.AxiosClient, this.RegionServices, this.config.userAgent);
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
        this.cookie = CookieJar.fromJSON(JSON.stringify(data.cookie));
        this.access_token = data.access_token;
        this.id_token = data.id_token;
        this.token_type = data.token_type;
        this.entitlements_token = data.entitlements_token;
        this.region = data.region;

        if (!this.config.lockRegion) {
            this.region = data.region;
        }

        this.reload();
    }

    //auth

    protected toJSONAuth(): ValWrapperAuth {
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

    protected fromJSONAuth(auth: ValWrapperAuth): void {
        this.cookie = CookieJar.fromJSON(JSON.stringify(auth.cookie));
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
            this.emit('error', {
                errorCode: 'ValWrapper_Authentication_Error',
                message: 'Authentication Error',
                data: auth,
            });
        }

        this.reload();
    }

    public async login(username: string, password: string): Promise<void> {
        const NewAuth: ValWrapperAuth = await ClientAuthAccount.login(username, password, this.config.userAgent);

        this.fromJSONAuth(NewAuth);
        this.reload();
    }

    public async verify(verificationCode: number): Promise<void> {
        const NewAuth: ValWrapperAuth = await ClientAuthMultifactor.verify(this.toJSONAuth(), verificationCode, this.config.userAgent);

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

        this.config.client.version = clientVersion;
        this.reload();
    }

    /**
    * @param {ValWrapperClientPlatfrom} clientPlatfrom Client Platfrom in json
    * @returns {void}
    */
    public setClientPlatfrom(clientPlatfrom:ValWrapperClientPlatfrom = _Client_Platfrom):void {
        this.emit('changeSettings', { name: 'client_platfrom', data: clientPlatfrom });

        this.config.client.platform = clientPlatfrom;
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

        return NewClient;
    }

    public static async fromCookie(config: ValWrapperConfig, data: ValWrapperClient): Promise<WrapperClient> {
        const CookieAuthData:ValWrapperAuth = {
            cookie: data.cookie,
            access_token: data.access_token,
            id_token: data.id_token,
            expires_in: 3600,
            token_type: data.token_type,
            entitlements_token: data.entitlements_token,
            region: data.region,
            multifactor: false,
            isError: false,
        }

        const NewCookieAuth = await ClientAuthCookie.reauth(CookieAuthData, String(config.userAgent));

        return WrapperClient.fromJSON(config, NewCookieAuth);
    }
}

//event
interface ValWrapperClientEvent {
    'ready': () => void,
    'changeSettings': (data: { name:string, data:any }) => void,
    'error': (data: ValWrapperClientError) => void;
}

declare interface WrapperClient {
    emit<EventName extends keyof ValWrapperClientEvent>(name: EventName, ...args: Parameters<ValWrapperClientEvent[EventName]>): void;
    on<EventName extends keyof ValWrapperClientEvent>(name: EventName, callback: ValWrapperClientEvent[EventName]): void;
    once<EventName extends keyof ValWrapperClientEvent>(name: EventName, callback: ValWrapperClientEvent[EventName]): void;
    off<EventName extends keyof ValWrapperClientEvent>(name: EventName, callback?: ValWrapperClientEvent[EventName]): void;
}

//export
export { WrapperClient };
export type { ValWrapperClient, ValWrapperClientPlatfrom, ValWrapperClientError, ValWrapperConfig, ValWrapperClientConfig, ValWrapperClientEvent };