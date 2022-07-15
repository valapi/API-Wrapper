//import

import {
    toUft8, Region as _Region,
    type ValorantApiError,
    ValRegion, type ValorantApiRegion,
    ValRequestClient, type ValorantApiRequestData, ValEvent
} from "@valapi/lib";

import {
    Client as ValAuth, type ValAuthEngine,
    ValAuthEngineDefault, ValAuthData
} from "@valapi/auth";
import { CONFIG_Ciphers, CONFIG_UserAgent } from "@valapi/auth/dist/client/Engine"
import { Agent as HttpAgent } from "http";
import { Agent as HttpsAgent } from "https";
import type { AxiosRequestConfig } from "axios";

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

namespace ValWebClient {
    export interface Options extends ValAuthEngine.Options {
        region?: keyof typeof _Region.from;
    }

    export interface Event {
        'ready': (data: ValWebClient) => void;
        'expires': (data: { name: string, data: any }) => void;
        'request': (data: ValorantApiRequestData) => void;
        'error': (data: ValorantApiError) => void;
    }
}

//event

declare interface ValWebClient {
    emit<EventName extends keyof ValWebClient.Event>(name: EventName, ...args: Parameters<ValWebClient.Event[EventName]>): void;
    on<EventName extends keyof ValWebClient.Event>(name: EventName, callback: ValWebClient.Event[EventName]): void;
    once<EventName extends keyof ValWebClient.Event>(name: EventName, callback: ValWebClient.Event[EventName]): void;
    off<EventName extends keyof ValWebClient.Event>(name: EventName, callback?: ValWebClient.Event[EventName]): void;
}

//class

const _defaultConfig: ValWebClient.Options = {
    region: 'na',
    client: ValAuthEngineDefault.client,
    axiosConfig: ValAuthEngineDefault.axiosConfig,
    expiresIn: ValAuthEngineDefault.expiresIn,
};

/**
 * API from Web Client
 */
class ValWebClient extends ValEvent {
    protected options: ValWebClient.Options;

    //reload
    private AuthClient: ValAuth;
    private RegionServices: ValorantApiRegion;
    private RequestClient: ValRequestClient;

    //data
    public isError = false;
    public isMultifactor = false;

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
     * @param {ValWebClient.Options} config Client Config
     */
    public constructor(config: ValWebClient.Options = {}) {
        super();
        this.AuthClient = new ValAuth(config);
        this.AuthClient.on('expires', ((data: ValAuth.Expire) => { this.emit('expires', data); }))
        this.AuthClient.on('error', ((data: { name: "ValAuth_Error", message: string, data?: any }) => { this.emit('error', { errorCode: data.name, message: data.message, data: data.data }); }));

        //config
        this.options = new Object({ ..._defaultConfig, ...config });

        this.RegionServices = new ValRegion(this.AuthClient.region.live as keyof typeof _Region.from).toJSON();

        //axios
        this.RequestClient = new ValRequestClient(this.options.axiosConfig);
        this.RequestClient.on('request', ((data: ValorantApiRequestData) => { this.emit('request', data); }));
        this.RequestClient.on('error', ((data: ValorantApiError) => { this.emit('error', data); }));

        //data


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
        this.Player = new PlayerService(this.RequestClient, this.RegionServices, CONFIG_UserAgent);

        //event
        this.emit('ready', this);
    }

    //reload

    private reload(): void {
        const _data = this.AuthClient.toJSON();

        this.isError = _data.isError;
        this.isMultifactor = _data.multifactor;

        //config
        this.AuthClient.config = this.options;

        this.RegionServices = new ValRegion(_data.region.live as keyof typeof _Region.from).toJSON();

        //axios
        const _normalAxiosConfig: AxiosRequestConfig = {
            headers: {
                Cookie: _data.cookie.ssid,
                'Authorization': `${_data.token_type} ${_data.access_token}`,
                'X-Riot-Entitlements-JWT': _data.entitlements_token,
                'X-Riot-ClientVersion': String(this.AuthClient.config.client?.version),
                'X-Riot-ClientPlatform': toUft8(JSON.stringify(this.AuthClient.config.client?.platform)),
            },
            httpsAgent: new HttpsAgent({ keepAlive: true, ciphers: CONFIG_Ciphers.join(':'), honorCipherOrder: true, minVersion: 'TLSv1.2', maxVersion: 'TLSv1.3' }),
            httpAgent: new HttpAgent({ keepAlive: true }),
        };
        this.RequestClient = new ValRequestClient(new Object({ ...this.AuthClient.config.axiosConfig, ...this.options.axiosConfig, ..._normalAxiosConfig }));
        this.RequestClient.on('request', ((data: ValorantApiRequestData) => { this.emit('request', data); }));
        this.RequestClient.on('error', ((data: ValorantApiError) => { this.emit('error', data); }));

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
        this.Player = new PlayerService(this.RequestClient, this.RegionServices, CONFIG_UserAgent);

        //event
        this.emit('ready', this);
    }

    //save

    private async fromCookie(cookie: string): Promise<void> {
        this.AuthClient = await ValAuth.fromCookie(cookie);

        this.reload();
    }

    /**
     * From {@link ValAuthData save} data
     * @param {ValAuthData} data {@link toJSON toJSON()} data
     * @returns {void}
     */
    public fromJSON(data: ValAuthData): void {
        this.AuthClient.fromJSON(data);

        this.reload();
    }

    /**
     * To {@link ValAuthData save} data
     * @returns {ValAuthData}
     */
    public toJSON(): ValAuthData {
        return this.AuthClient.toJSON();
    }

    //auth

    /**
     * Reconnect to the server
     * @param force force to reload (only token)
     * @returns {Promise<Array<ValAuth.Expire>>}
     */
    public async refresh(force?: Boolean): Promise<Array<ValAuth.Expire>> {
        return this.AuthClient.refresh(force);
    }

    /**
     * Login to Riot Account
     * @param {string} username Username
     * @param {string} password Password
     * @returns {Promise<void>}
     */
    public async login(username: string, password: string): Promise<void> {
        await this.AuthClient.login(username, password);

        this.reload();
    }

    /**
     * Multi-Factor Authentication
     * @param {number} verificationCode Verification Code
     * @returns {Promise<void>}
     */
    public async verify(verificationCode: number): Promise<void> {
        await this.AuthClient.verify(verificationCode);

        this.reload();
    }

    //settings

    /**
     * @param {string} region Region
     * @returns {void}
     */
    public setRegion(region: keyof typeof _Region.from): void {
        this.options.region = region;
        this.AuthClient.region.live = region;

        this.reload();
    }

    /**
     * @param {string} clientVersion Client Version
     * @returns {void}
     */
    public setClientVersion(clientVersion: string = ValAuthEngineDefault.client?.version as string): void {
        this.options.client = {
            version: clientVersion,
            platform: this.options.client?.platform,
        };

        this.reload();
    }

    /**
     * @param {ValAuthEngine.ClientPlatfrom} clientPlatfrom Client Platfrom in json
     * @returns {void}
     */
    public setClientPlatfrom(clientPlatfrom: ValAuthEngine.ClientPlatfrom = ValAuthEngineDefault.client?.platform as ValAuthEngine.ClientPlatfrom): void {
        this.options.client = {
            version: this.options.client?.version,
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
    public static fromJSON(data: ValAuthData, options?: ValWebClient.Options): ValWebClient {
        const _WebClient = new ValWebClient(options);
        _WebClient.fromJSON(data);

        return _WebClient;
    }

    /**
     * From ssid Cookie
     * @param {string} cookie ssid Cookie
     * @param {ValWebClient.Options} options Client Config
     * @returns {Promise<ValWebClient>}
     */
    public static async fromCookie(cookie: string, options?: ValWebClient.Options): Promise<ValWebClient> {
        const _WebClient = new ValWebClient(options);
        await _WebClient.fromCookie(cookie);

        return _WebClient;
    }
}

//export

export { ValWebClient };