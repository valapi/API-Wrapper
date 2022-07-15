import { Region as _Region, type ValorantApiError, type ValorantApiRequestData, ValEvent } from "@valapi/lib";
import { Client as ValAuth, type ValAuthEngine, ValAuthData } from "@valapi/auth";
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
    interface Options extends ValAuthEngine.Options {
        region?: keyof typeof _Region.from;
    }
    interface Event {
        'ready': (data: ValWebClient) => void;
        'expires': (data: {
            name: string;
            data: any;
        }) => void;
        'request': (data: ValorantApiRequestData) => void;
        'error': (data: ValorantApiError) => void;
    }
}
declare interface ValWebClient {
    emit<EventName extends keyof ValWebClient.Event>(name: EventName, ...args: Parameters<ValWebClient.Event[EventName]>): void;
    on<EventName extends keyof ValWebClient.Event>(name: EventName, callback: ValWebClient.Event[EventName]): void;
    once<EventName extends keyof ValWebClient.Event>(name: EventName, callback: ValWebClient.Event[EventName]): void;
    off<EventName extends keyof ValWebClient.Event>(name: EventName, callback?: ValWebClient.Event[EventName]): void;
}
declare class ValWebClient extends ValEvent {
    protected options: ValWebClient.Options;
    private AuthClient;
    private RegionServices;
    private RequestClient;
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
     * Create a new Valorant API Wrapper Client
     * @param {ValWebClient.Options} config Client Config
     */
    constructor(config?: ValWebClient.Options);
    private reload;
    /**
     * From {@link ValAuthData save} data
     * @param {ValAuthData} data {@link toJSON toJSON()} data
     * @returns {void}
     */
    fromJSON(data: ValAuthData): void;
    /**
     * To {@link ValAuthData save} data
     * @returns {ValAuthData}
     */
    toJSON(): ValAuthData;
    /**
     * Reconnect to the server
     * @param force force to reload (only token)
     * @returns {Promise<Array<ValAuth.Expire>>}
     */
    refresh(force?: Boolean): Promise<Array<ValAuth.Expire>>;
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
    setRegion(region: keyof typeof _Region.from): void;
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
      * From {@link toJSON toJSON()} data
      * @param {ValAuthData} data {@link toJSON toJSON()} data
      * @param {ValAuthEngine.Options} options Client Config
      * @returns {ValAuth}
      */
    static fromJSON(data: ValAuthData, options?: ValAuthEngine.Options): ValWebClient;
}
export { ValWebClient };
