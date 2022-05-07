//import
import { Event as CustomEvent } from "./Event";

import { toBase64 } from "../util/Uft8";
import { CookieJar } from "tough-cookie";

import { Region as WrapperRegion } from "./Region";
import _Region from "../resources/Region";

import type { AxiosRequestConfig } from "axios";
import type { ValWrapperRegion } from "./Region";
import type { ValWrapperAxiosError } from "./AxiosClient";

import { Account as ClientAuthAccount, type ValWrapperAuth } from "../auth/Account";
import { Multifactor as ClientAuthMultifactor } from "../auth/Multifactor";

const _Client_Version = 'release-04.08-shipping-15-701907';
const _Client_Platfrom = {
    "platformType": "PC",
    "platformOS": "Windows",
    "platformOSVersion": "10.0.19042.1.256.64bit",
    "platformChipset": "Unknown"
}

//service
import { Client as ClientService } from "../service/Client";
import { Contract as ContractService } from "../service/Contract";
import { CurrentGame as CurrentGameService } from "../service/CurrentGame";
import { Match as MatchService } from "../service/Match";
import { Party as PartyService } from "../service/Party";
import { Player as PlayerService } from "../service/Player";
import { PreGame as PreGameService } from "../service/PreGame";
import { Store as StoreService } from "../service/Store";

//interface

interface ValWrapperClient {
    cookie: CookieJar.Serialized,
    access_token: string,
    token_type: string,
    entitlements_token: string,
    region: {
        pbe: string,
        live: string,
    },
}

interface ValWrapperClientPlatfrom {
    "platformType": string,
    "platformOS": string,
    "platformOSVersion": string,
    "platformChipset": string
}

interface ValWrapperClientError {
    errorCode: string,
    message: string,
}

interface ValWrapperService {
    AxiosData: AxiosRequestConfig,
    Region: ValWrapperRegion,
}

interface ValWrapperConfig {
    UserAgent?: string,
    Region?: keyof typeof _Region,
    client?: {
        version?: string,
        platform?: ValWrapperClientPlatfrom,
    },
}

interface ValWrapperClientConfig {
    UserAgent: string,
    Region: keyof typeof _Region,
    lockRegion: boolean,
    client: {
        version: string,
        platform: ValWrapperClientPlatfrom,
    },
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

    config: ValWrapperClientConfig;

    //reload
    private RegionServices: ValWrapperRegion;
    private services: ValWrapperService;

    //service
    public Client: ClientService;
    public Contract: ContractService;
    public CurrentGame: CurrentGameService;
    public Match: MatchService;
    public Party: PartyService;
    public Player: PlayerService;
    public Pregame: PreGameService;
    public Store: StoreService;

    constructor(config: ValWrapperConfig = {}) {
        super();
        //config
        if (!config.UserAgent) {
            config.UserAgent = 'RiotClient/43.0.1.41953 86.4190634 rso-auth (Windows; 10;;Professional, x64)';
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

        this.config = {
            UserAgent: config.UserAgent,
            Region: 'na',
            client: {
                version: config.client.version as string,
                platform: config.client.platform as ValWrapperClientPlatfrom,
            },
            lockRegion: false,
        };

        if (!config.Region) {
            this.config.lockRegion = false;
        } else {
            this.config.Region = config.Region as keyof typeof _Region;
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
            live: this.config.Region,
        };
        this.multifactor = false;
        this.isError = true;

        //first reload
        this.RegionServices = new WrapperRegion(this.region.live as keyof typeof _Region).toJSON();

        //services
        this.services = {
            AxiosData: {
                headers: {
                    'Authorization': `${this.token_type} ${this.access_token}`,
                    'X-Riot-Entitlements-JWT': this.entitlements_token,
                    'X-Riot-ClientVersion': this.config.client.version,
                    'X-Riot-ClientPlatform': toBase64(JSON.stringify(this.config.client.platform)),
                },
            },
            Region: this.RegionServices,
        };

        //service list
        this.Client = new ClientService(this.services);
        this.Contract = new ContractService(this.services);
        this.CurrentGame = new CurrentGameService(this.services);
        this.Match = new MatchService(this.services);
        this.Party = new PartyService(this.services);
        this.Player = new PlayerService(this.services);
        this.Pregame = new PreGameService(this.services);
        this.Store = new StoreService(this.services);

        //event
        this.emit('ready');
    }

    //reload

    /**
     * @returns {void}
     */
    private reload(): void {
        this.RegionServices = new WrapperRegion(this.region.live as keyof typeof _Region).toJSON();

        //services
        this.services = {
            AxiosData: {
                headers: {
                    'Authorization': `${this.token_type} ${this.access_token}`,
                    'X-Riot-Entitlements-JWT': this.entitlements_token,
                    'X-Riot-ClientVersion': this.config.client.version,
                    'X-Riot-ClientPlatform': toBase64(JSON.stringify(this.config.client.platform)),
                },
            },
            Region: this.RegionServices,
        };

        //service list
        this.Client = new ClientService(this.services);
        this.Contract = new ContractService(this.services);
        this.CurrentGame = new CurrentGameService(this.services);
        this.Match = new MatchService(this.services);
        this.Party = new PartyService(this.services);
        this.Player = new PlayerService(this.services);
        this.Pregame = new PreGameService(this.services);
        this.Store = new StoreService(this.services);
    }

    //save

    public toJSON(): ValWrapperClient {
        return {
            cookie: this.cookie.toJSON(),
            access_token: this.access_token,
            token_type: this.token_type,
            entitlements_token: this.entitlements_token,
            region: this.region,
        };
    }

    public fromJSON(data: ValWrapperClient): void {
        this.cookie = CookieJar.fromJSON(JSON.stringify(data.cookie));
        this.access_token = data.access_token;
        this.token_type = data.token_type;
        this.entitlements_token = data.entitlements_token;
        this.region = data.region;
    }

    //auth

    private toJSONAuth(): ValWrapperAuth {
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

    private fromJSONAuth(auth: ValWrapperAuth): void {
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
            const _error: ValWrapperClientError = {
                errorCode: 'ValWrapper_Authentication_Error',
                message: 'Authentication Error',
            }
            this.emit('error', _error);
        }
    }

    public async login(username: string, password: string): Promise<void> {
        const NewAuth: ValWrapperAuth = await ClientAuthAccount.login(username, password, this.config.UserAgent);

        this.fromJSONAuth(NewAuth);
        this.reload();
    }

    public async verify(verificationCode: number): Promise<void> {
        const NewAuth: ValWrapperAuth = await ClientAuthMultifactor.verify(this.toJSONAuth(), verificationCode, this.config.UserAgent);

        this.fromJSONAuth(NewAuth);
        this.reload();
    }

    //settings
    //wait me a bit

    //static

    public static fromJSON(config: ValWrapperConfig, data: ValWrapperClient): WrapperClient {
        const NewClient: WrapperClient = new WrapperClient(config);
        NewClient.fromJSON(data);

        return NewClient;
    }
}

//event
interface ValWrapperClientEvent {
    'ready': () => void,
    'error': (data: ValWrapperClientError) => void;
}

declare interface WrapperClient {
    on<EventName extends keyof ValWrapperClientEvent>(name: EventName, callback: ValWrapperClientEvent[EventName]): void;
    once<EventName extends keyof ValWrapperClientEvent>(name: EventName, callback: ValWrapperClientEvent[EventName]): void;
    off<EventName extends keyof ValWrapperClientEvent>(name: EventName, callback?: ValWrapperClientEvent[EventName]): void;
}

//export
export { WrapperClient };
export type { ValWrapperClient, ValWrapperClientPlatfrom, ValWrapperClientError, ValWrapperService, ValWrapperConfig, ValWrapperClientConfig, ValWrapperClientEvent };