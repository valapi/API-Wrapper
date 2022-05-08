import { CustomEvent } from "@valapi/lib";
import { CookieJar } from "tough-cookie";
import { Region as _Region } from "@valapi/lib";
import { Client as ClientService } from "../service/Client";
import { Contract as ContractService } from "../service/Contract";
import { CurrentGame as CurrentGameService } from "../service/CurrentGame";
import { Match as MatchService } from "../service/Match";
import { Party as PartyService } from "../service/Party";
import { Player as PlayerService } from "../service/Player";
import { PreGame as PreGameService } from "../service/PreGame";
import { Store as StoreService } from "../service/Store";
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
    UserAgent?: string;
    Region?: keyof typeof _Region;
    client?: {
        version?: string;
        platform?: ValWrapperClientPlatfrom;
    };
    timeout?: number;
}
interface ValWrapperClientConfig {
    UserAgent: string;
    Region: keyof typeof _Region;
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
    Client: ClientService;
    Contract: ContractService;
    CurrentGame: CurrentGameService;
    Match: MatchService;
    Party: PartyService;
    Player: PlayerService;
    Pregame: PreGameService;
    Store: StoreService;
    constructor(config?: ValWrapperConfig);
    /**
     * @returns {void}
     */
    private reload;
    toJSON(): ValWrapperClient;
    fromJSON(data: ValWrapperClient): void;
    private toJSONAuth;
    private fromJSONAuth;
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