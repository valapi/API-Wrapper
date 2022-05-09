import { CustomEvent } from "@valapi/lib";
import { CookieJar } from "tough-cookie";
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
    protected config: ValWrapperClientConfig;
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
    constructor(config?: ValWrapperConfig);
    /**
     * @returns {void}
     */
    private reload;
    toJSON(): ValWrapperClient;
    fromJSON(data: ValWrapperClient): void;
    protected toJSONAuth(): ValWrapperAuth;
    protected fromJSONAuth(auth: ValWrapperAuth): void;
    login(username: string, password: string): Promise<void>;
    verify(verificationCode: number): Promise<void>;
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
    static fromJSON(config: ValWrapperConfig, data: ValWrapperClient): WrapperClient;
}
interface ValWrapperClientEvent {
    'ready': () => void;
    'changeSettings': (data: {
        name: string;
        data: any;
    }) => void;
    'error': (data: ValWrapperClientError) => void;
}
declare interface WrapperClient {
    emit<EventName extends keyof ValWrapperClientEvent>(name: EventName, ...args: Parameters<ValWrapperClientEvent[EventName]>): void;
    on<EventName extends keyof ValWrapperClientEvent>(name: EventName, callback: ValWrapperClientEvent[EventName]): void;
    once<EventName extends keyof ValWrapperClientEvent>(name: EventName, callback: ValWrapperClientEvent[EventName]): void;
    off<EventName extends keyof ValWrapperClientEvent>(name: EventName, callback?: ValWrapperClientEvent[EventName]): void;
}
export { WrapperClient };
export type { ValWrapperClient, ValWrapperClientPlatfrom, ValWrapperClientError, ValWrapperConfig, ValWrapperClientConfig, ValWrapperClientEvent };
//# sourceMappingURL=Client.d.ts.map