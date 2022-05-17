import { CookieJar } from 'tough-cookie';
interface ValWrapperAuth {
    cookie: CookieJar.Serialized;
    access_token: string;
    id_token: string;
    expires_in: number;
    token_type: string;
    entitlements_token: string;
    region: {
        pbe: string;
        live: string;
    };
    multifactor: boolean;
    isError: boolean;
}
/**
 * * Class ID: @ing3kth/valapi/ValClient/Account
 */
declare class Account {
    private cookie;
    private access_token;
    private id_token;
    private expires_in;
    private token_type;
    private entitlements_token;
    private region;
    multifactor: boolean;
    isError: boolean;
    constructor(data: ValWrapperAuth);
    /**
     * @param {String} username Riot Account Username (not email)
     * @param {String} password Riot Account Password
     * @param {String} UserAgent User Agent
     * @returns {Promise<ValWrapperAuth>}
     */
    execute(username: string, password: string, UserAgent: string, clientVersion: string, clientPlatfrom: string): Promise<ValWrapperAuth>;
    /**
     *
     * @returns {ValWrapperAuth}
     */
    toJSON(): ValWrapperAuth;
    /**
     * @param {String} username Riot Account Username
     * @param {String} password Riot Account Password
     * @param {String} UserAgent User Agent
     * @returns {Promise<ValWrapperAuth>}
     */
    static login(data: ValWrapperAuth, username: string, password: string, UserAgent: string, clientVersion: string, clientPlatfrom: string): Promise<ValWrapperAuth>;
}
export { Account };
export type { ValWrapperAuth };
//# sourceMappingURL=Account.d.ts.map