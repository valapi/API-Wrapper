import type { ValRequestClient } from '@valapi/lib';
import type { ValWrapperAuth } from './Account';
import { type AxiosRequestConfig } from 'axios';
/**
 * * Not Recommend
 */
declare class CookieAuth {
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
     * @param {ValWrapperAuth} data Account toJSON data
     */
    constructor(data: ValWrapperAuth);
    /**
     *
     * @param {Array<string>} ULRs Url list
     * @returns {string | undefined}
     */
    private tranferURL;
    /**
     * @param {String} UserAgent User Agent
     * @param {String} clientVersion Client Version
     * @param {String} clientPlatfrom Client Platform
     * @returns {Promise<any>}
     */
    execute(UserAgent: string, clientVersion: string, clientPlatfrom: string, RequestClient: ValRequestClient, axiosConfig: AxiosRequestConfig): Promise<any>;
    /**
     *
     * @returns {ValWrapperAuth}
     */
    toJSON(): ValWrapperAuth;
    /**
     * @param {ValWrapperAuth} data ValAuth_Account toJSON data
     * @param {String} UserAgent User Agent
     * @param {String} clientVersion Client Version
     * @param {String} clientPlatfrom Client Platform
     * @returns {Promise<ValWrapperAuth>}
     */
    static reauth(data: ValWrapperAuth, UserAgent: string, clientVersion: string, clientPlatfrom: string, RequestClient: ValRequestClient, axiosConfig: AxiosRequestConfig): Promise<ValWrapperAuth>;
}
export { CookieAuth };
//# sourceMappingURL=CookieAuth.d.ts.map