import { CookieJar } from 'tough-cookie';
import type { ValRequestClient } from '@valapi/lib';
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
interface ValWrapperAuthExtend {
    UserAgent: string;
    clientVersion: string;
    clientPlatform: string;
    RequestClient: ValRequestClient;
    lockRegion: Boolean;
}
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
    /**
     * Class Constructor
     * @param {ValWrapperAuth} data Authentication Data
     */
    constructor(data: ValWrapperAuth);
    /**
     * @param {String} username Riot Account Username (not email)
     * @param {String} password Riot Account Password
     * @param {ValWrapperAuthExtend} extendsData Extradata of auth
     * @returns {Promise<ValWrapperAuth>}
     */
    execute(username: string, password: string, extendsData: ValWrapperAuthExtend): Promise<ValWrapperAuth>;
    /**
     *
     * @returns {ValWrapperAuth}
     */
    toJSON(): ValWrapperAuth;
    /**
     * @param {ValWrapperAuth} data Authentication Data
     * @param {String} username Riot Account Username
     * @param {String} password Riot Account Password
     * @param {ValWrapperAuthExtend} extendsData Extradata of auth
     * @returns {Promise<ValWrapperAuth>}
     */
    static login(data: ValWrapperAuth, username: string, password: string, extendsData: ValWrapperAuthExtend): Promise<ValWrapperAuth>;
}
export { Account };
export type { ValWrapperAuth, ValWrapperAuthExtend };
//# sourceMappingURL=Account.d.ts.map