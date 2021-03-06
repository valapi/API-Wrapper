import { Region, ValRequestClient, ValEvent } from "@valapi/lib";
import { Client as ValAuth, ValAuthEngine } from "@valapi/auth";
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
declare namespace ValWebClient {
    /**
     * Client Config
     */
    interface Options extends ValAuthEngine.Options {
        /**
         * Region
         */
        region?: Region.String;
    }
    /**
     * Client Events
     */
    interface Event {
        'ready': () => void;
        'expires': (data: {
            name: string;
            data: any;
        }) => void;
        'request': (data: ValRequestClient.Request) => void;
        'error': (data: ValEvent.Error) => void;
    }
}
declare interface ValWebClient {
    emit<EventName extends keyof ValWebClient.Event>(name: EventName, ...args: Parameters<ValWebClient.Event[EventName]>): void;
    on<EventName extends keyof ValWebClient.Event>(name: EventName, callback: ValWebClient.Event[EventName]): void;
    once<EventName extends keyof ValWebClient.Event>(name: EventName, callback: ValWebClient.Event[EventName]): void;
    off<EventName extends keyof ValWebClient.Event>(name: EventName, callback?: ValWebClient.Event[EventName]): void;
}
/**
 * API from Web Client
 */
declare class ValWebClient extends ValEvent {
    protected options: ValWebClient.Options;
    private AuthClient;
    private RegionServices;
    private RequestClient;
    isError: boolean;
    isMultifactor: boolean;
    Contract: ContractService;
    CurrentGame: CurrentGameService;
    Party: PartyService;
    Pregame: PreGameService;
    Session: SessionService;
    Store: StoreService;
    Client: ClientService;
    Match: MatchService;
    MMR: MMRService;
    Player: PlayerService;
    /**
     * Create a new {@link ValWebClient} Client
     * @param {ValWebClient.Options} config Client Config
     */
    constructor(config?: ValWebClient.Options);
    private reload;
    fromCookie(cookie: string): Promise<void>;
    /**
     *
     * @param {ValAuthEngine.Json} data {@link toJSON toJSON()} data
     * @returns {void}
     */
    fromJSON(data: ValAuthEngine.Json): void;
    /**
     *
     * @returns {ValAuthEngine.Json}
     */
    toJSON(): ValAuthEngine.Json;
    /**
     *
     * @param {string} token Access Token
     * @returns {string} Player UUID
     */
    getSubject(token?: string): string;
    /**
     * Reconnect to the server
     * @param force force to reload (only token)
     * @returns {Promise<Array<ValAuth.Expire>>}
     */
    refresh(force?: boolean): Promise<Array<ValAuth.Expire>>;
    /**
     * Login to Riot Account
     * @param {string} username Username
     * @param {string} password Password
     * @returns {Promise<void>}
     */
    login(username: string, password: string): Promise<void>;
    /**
     * Multi-Factor Authentication
     * @param {number} verificationCode Verification Code
     * @returns {Promise<void>}
     */
    verify(verificationCode: number): Promise<void>;
    /**
     * @param {string} region Region
     * @returns {void}
     */
    setRegion(region: Region.String): void;
    /**
     * @param {string} clientVersion Client Version
     * @returns {void}
     */
    setClientVersion(clientVersion?: string): void;
    /**
     * @param {ValAuthEngine.ClientPlatfrom} clientPlatfrom Client Platfrom in json
     * @returns {void}
     */
    setClientPlatfrom(clientPlatfrom?: ValAuthEngine.ClientPlatfrom): void;
    /**
      *
      * @param {ValAuthEngine.Json} data {@link toJSON toJSON()} data
      * @param {ValWebClient.Options} options Client Config
      * @returns {ValWebClient}
      */
    static fromJSON(data: ValAuthEngine.Json, options?: ValWebClient.Options): ValWebClient;
    /**
     * From ssid Cookie
     * @param {string} cookie ssid Cookie
     * @param {ValWebClient.Options} options Client Config
     * @returns {Promise<ValWebClient>}
     */
    static fromCookie(cookie: string, options?: ValWebClient.Options): Promise<ValWebClient>;
}
export { ValWebClient };
