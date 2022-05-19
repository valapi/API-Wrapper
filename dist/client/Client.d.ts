import { CustomEvent, type ValorantAPIError } from "@valapi/lib";
import { CookieJar } from "tough-cookie";
import type { AxiosRequestConfig } from "axios";
import { Region as _Region } from "@valapi/lib";
import { type ValWrapperAxiosRequest } from "./AxiosClient";
import { type ValWrapperAuth } from "../auth/Account";
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
    forceAuth?: boolean;
    axiosConfig?: AxiosRequestConfig;
}
declare class WrapperClient extends CustomEvent {
    private cookie;
    private access_token;
    private id_token;
    private expires_in;
    private token_type;
    private entitlements_token;
    multifactor: boolean;
    isError: boolean;
    private region;
    protected config: ValWrapperConfig;
    protected lockRegion: boolean;
    private RegionServices;
    private AxiosClient;
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
     * @param {ValWrapperConfig} config Client Config
     */
    constructor(config?: ValWrapperConfig);
    /**
     * Reload Class
     * @returns {void}
     */
    private reload;
    /**
     *
     * @returns {ValWrapperClient}
     */
    toJSON(): ValWrapperClient;
    /**
     *
     * @param {ValWrapperClient} data Client `.toJSON()` data
     * @returns {void}
     */
    fromJSON(data: ValWrapperClient): void;
    /**
     *
     * @returns {ValWrapperAuth}
     */
    toJSONAuth(): ValWrapperAuth;
    /**
     *
     * @param {ValWrapperAuth} auth Authentication Data
     * @returns {void}
     */
    fromJSONAuth(auth: ValWrapperAuth): void;
    /**
     * Login to Riot Account
     * @param {String} username Username
     * @param {String} password Password
     * @returns {Promise<void>}
     */
    login(username: string, password: string): Promise<void>;
    /**
     * Multi-Factor Authentication
     * @param {number} verificationCode Verification Code
     * @returns {Promise<void>}
     */
    verify(verificationCode: number | string): Promise<void>;
    /**
     * @param {String} region Region
     * @returns {void}
     */
    setRegion(region: keyof typeof _Region): void;
    /**
     * @param {String} clientVersion Client Version
     * @returns {void}
     */
    setClientVersion(clientVersion?: string): void;
    /**
     * @param {ValWrapperClientPlatfrom} clientPlatfrom Client Platfrom in json
     * @returns {void}
     */
    setClientPlatfrom(clientPlatfrom?: ValWrapperClientPlatfrom): void;
    /**
     * @param {CookieJar.Serialized} cookie Cookie
     * @returns {void}
     */
    setCookie(cookie: CookieJar.Serialized): void;
    /**
     * * Something went wrong? try to not use static methods.
     * @param {ValWrapperConfig} config Client Config
     * @param {ValWrapperClient} data Client `.toJSON()` data
     * @returns {WrapperClient}
     */
    static fromJSON(config: ValWrapperConfig, data: ValWrapperClient): WrapperClient;
    /**
     * * Not Recommend to use
     * * After run this method, you must use `.setRegion()` to set region.
     * @param {ValWrapperConfig} config Client Config
     * @param {ValWrapperAuth} data Authentication Data
     * @returns {Promise<WrapperClient>}
     */
    static fromCookie(config: ValWrapperConfig, data: ValWrapperAuth): Promise<WrapperClient>;
}
interface ValWrapperClientEvent {
    'ready': () => void;
    'request': (data: ValWrapperAxiosRequest) => void;
    'changeSettings': (data: {
        name: string;
        data: any;
    }) => void;
    'error': (data: ValorantAPIError) => void;
}
declare interface WrapperClient {
    emit<EventName extends keyof ValWrapperClientEvent>(name: EventName, ...args: Parameters<ValWrapperClientEvent[EventName]>): void;
    on<EventName extends keyof ValWrapperClientEvent>(name: EventName, callback: ValWrapperClientEvent[EventName]): void;
    once<EventName extends keyof ValWrapperClientEvent>(name: EventName, callback: ValWrapperClientEvent[EventName]): void;
    off<EventName extends keyof ValWrapperClientEvent>(name: EventName, callback?: ValWrapperClientEvent[EventName]): void;
}
export { WrapperClient };
export type { ValWrapperClient, ValWrapperClientPlatfrom, ValWrapperConfig, ValWrapperClientEvent };
//# sourceMappingURL=Client.d.ts.map