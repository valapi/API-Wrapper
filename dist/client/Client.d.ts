import { ValEvent, type ValorantApiError } from "@valapi/lib";
import { CookieJar } from "tough-cookie";
import type { AxiosRequestConfig } from "axios";
import { type ValorantApiRequestData } from "@valapi/lib";
import { Region as _Region } from "@valapi/lib";
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
    cookie: CookieJar.Serialized;
    access_token: string;
    id_token?: string;
    token_type?: string;
    entitlements_token: string;
    region: {
        pbe: string;
        live: string;
    };
    expires: {
        cookie: Date;
        token: Date;
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
        version?: string;
        platform?: ValWrapperClientPlatfrom;
    };
    forceAuth?: boolean;
    axiosConfig?: AxiosRequestConfig;
    expiresIn?: {
        cookie: number;
        token?: number;
    };
    selfAuthentication?: {
        username: string | Function;
        password: string | Function;
        verifyCode?: string | number | Function;
    };
}
declare class WrapperClient extends ValEvent {
    reloadTimes: number;
    reconnectTimes: number;
    private cookie;
    private access_token;
    private id_token;
    private expires_in;
    private token_type;
    private entitlements_token;
    multifactor: boolean;
    isError: boolean;
    expireAt: {
        cookie: Date;
        token: Date;
    };
    private region;
    protected config: ValWrapperConfig;
    protected lockRegion: boolean;
    private axiosConfig;
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
     * @param {ValWrapperConfig} config Client Config
     */
    constructor(config?: ValWrapperConfig);
    /**
     * Reload Class
     * @returns {void}
     */
    private reload;
    /**
     * Reconnect to the server
     * @param {Boolean} force Force to reconnect
     */
    reconnect(force?: Boolean): Promise<void>;
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
     * * Not Recommend to use
     * @param {CookieJar} cookie Client Cookie
     * @returns {Promise<void>}
     */
    fromCookie(cookie?: CookieJar): Promise<void>;
    /**
     * Login to Riot Account
     * @param {String} username Username
     * @param {String} password Password
     * @returns {Promise<void>}
     */
    login(username: string | Function, password: string | Function): Promise<void>;
    /**
     * Multi-Factor Authentication
     * @param {number} verificationCode Verification Code
     * @returns {Promise<void>}
     */
    verify(verificationCode: number | string | Function): Promise<void>;
    /**
     * @param {String} region Region
     * @returns {void}
     */
    setRegion(region: keyof typeof _Region.from): void;
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
}
interface ValWrapperClientEvent {
    'ready': () => void;
    'expires': (data: {
        name: string;
        data: any;
    }) => void;
    'request': (data: ValorantApiRequestData) => void;
    'changeSettings': (data: {
        name: string;
        data: any;
    }) => void;
    'error': (data: ValorantApiError) => void;
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