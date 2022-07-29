//import

import {
    toUft8, Region,
    ValRegion,
    ValRequestClient, ValEvent
} from "@valapi/lib";

import { Client as ValAuth, ValAuthEngine } from "@valapi/auth";
import { type AgentOptions as HttpsAgentOptions, Agent as HttpsAgent } from "https";
import { type AgentOptions as HttpAgentOptions, Agent as HttpAgent } from "http";

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
    /**
     * Client Config
     */
    export interface Options extends ValAuthEngine.Options {
        /**
         * Region
         */
        region?: Region.String;
    }

    /**
     * Client Events
     */
    export interface Event {
        'ready': () => void;
        'expires': (data: { name: string, data: any }) => void;
        'request': (data: ValRequestClient.Request) => void;
        'error': (data: ValEvent.Error) => void;
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

/**
 * API from Web Client
 */
class ValWebClient extends ValEvent {
    protected options: ValWebClient.Options;

    //reload
    private AuthClient: ValAuth;
    private RegionServices: ValRegion.Json;
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
     * Create a new {@link ValWebClient} Client
     * @param {ValWebClient.Options} config Client Config
     */
    public constructor(config: ValWebClient.Options = {}) {
        super();
        this.AuthClient = new ValAuth(config);
        this.AuthClient.on('expires', ((data: ValAuth.Expire) => { this.emit('expires', data); }));
        this.AuthClient.on('error', ((data: { name: "ValAuth_Error", message: string, data?: any }) => { this.emit('error', { errorCode: data.name, message: data.message, data: data.data }); }));

        //config
        this.options = { ...ValAuthEngine.Default.config, ...config };

        this.RegionServices = new ValRegion(this.AuthClient.region.live as Region.String).toJSON();

        //axios
        this.RequestClient = new ValRequestClient(this.options.axiosConfig);
        this.RequestClient.on('request', ((data: ValRequestClient.Request) => { this.emit('request', data); }));
        this.RequestClient.on('error', ((data: ValEvent.Error) => { this.emit('error', data); }));

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
        this.Player = new PlayerService(this.RequestClient, this.RegionServices, ValAuthEngine.Default.userAgent);

        //event
        this.emit('ready');
    }

    //reload

    private reload(): void {
        const _data = this.AuthClient.toJSON();

        this.isError = _data.isError;
        this.isMultifactor = _data.isMultifactor;

        this.AuthClient.region = {
            live: this.options.region || _data.region.live,
            pbe: "na",
        };

        //config
        this.AuthClient.config = this.options;

        this.RegionServices = new ValRegion(_data.region.live as Region.String).toJSON();

        //axios
        let HttpsConfig: HttpsAgentOptions = { keepAlive: true, ciphers: ValAuthEngine.Default.ciphers, honorCipherOrder: true, minVersion: 'TLSv1.2', maxVersion: 'TLSv1.3' };
        let HttpConfig: HttpAgentOptions = { keepAlive: true };

        if (this.options.axiosConfig?.proxy && typeof this.options.axiosConfig?.proxy !== 'boolean') {
            HttpsConfig = { ...HttpsConfig, ...{ port: this.options.axiosConfig?.proxy?.port, host: this.options.axiosConfig?.proxy?.host } };
            HttpConfig = { ...HttpConfig, ...{ port: this.options.axiosConfig?.proxy?.port, host: this.options.axiosConfig?.proxy?.host } };
        }

        this.RequestClient = new ValRequestClient({
            ...this.options.axiosConfig,
            ...{
                headers: {
                    Cookie: _data.cookie.ssid,
                    'Authorization': `${_data.token_type} ${_data.access_token}`,
                    'X-Riot-Entitlements-JWT': _data.entitlements_token,
                    'X-Riot-ClientVersion': String(this.AuthClient.config.client?.version),
                    'X-Riot-ClientPlatform': toUft8(JSON.stringify(this.AuthClient.config.client?.platform)),
                },
                httpsAgent: new HttpsAgent(HttpsConfig),
                httpAgent: new HttpAgent(HttpConfig)
            },
        });
        this.RequestClient.on('request', ((data: ValRequestClient.Request) => { this.emit('request', data); }));
        this.RequestClient.on('error', ((data: ValEvent.Error) => { this.emit('error', data); }));

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
        this.Player = new PlayerService(this.RequestClient, this.RegionServices, ValAuthEngine.Default.userAgent);

        //event
        this.emit('ready');
    }

    //save

    public async fromCookie(cookie: string): Promise<void> {
        await this.AuthClient.fromCookie(cookie);

        this.reload();
    }

    /**
     * 
     * @param {ValAuthEngine.Json} data {@link toJSON toJSON()} data
     * @returns {void}
     */
    public fromJSON(data: ValAuthEngine.Json): void {
        this.AuthClient.fromJSON(data);

        this.reload();
    }

    /**
     * 
     * @returns {ValAuthEngine.Json}
     */
    public toJSON(): ValAuthEngine.Json {
        return this.AuthClient.toJSON();
    }

    /**
     *
     * @param {string} token Access Token
     * @returns {string} Player UUID
     */
    public getSubject(token?: string): string {
        return this.AuthClient.parseToken(token);
    }

    //auth

    /**
     * Reconnect to the server
     * @param force force to reload (only token)
     * @returns {Promise<Array<ValAuth.Expire>>}
     */
    public async refresh(force?: boolean): Promise<Array<ValAuth.Expire>> {
        const ExpireData = await this.AuthClient.refresh(force);

        if (this.options.region) {
            this.AuthClient.region.live = this.options.region;
        }

        return ExpireData;
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
    public setRegion(region: Region.String): void {
        this.options.region = region;

        this.reload();
    }

    /**
     * @param {string} clientVersion Client Version
     * @returns {void}
     */
    public setClientVersion(clientVersion: string = ValAuthEngine.Default.client.version): void {
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
    public setClientPlatfrom(clientPlatfrom: ValAuthEngine.ClientPlatfrom = ValAuthEngine.Default.client.platform): void {
        this.options.client = {
            version: this.options.client?.version,
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
    public static fromJSON(data: ValAuthEngine.Json, options?: ValWebClient.Options): ValWebClient {
        const _WebClient = new ValWebClient(options);
        _WebClient.fromJSON(data);

        if (!options?.region) {
            _WebClient.setRegion(data.region.live as Region.String);
        }

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