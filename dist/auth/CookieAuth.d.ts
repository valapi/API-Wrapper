import type { ValWrapperAuth, ValWrapperAuthExtend } from './Account';
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
     * @param {ValWrapperAuthExtend} extendsData Extradata of auth
     * @returns {Promise<any>}
     */
    execute(extendsData: ValWrapperAuthExtend, axiosConfig: AxiosRequestConfig): Promise<any>;
    /**
     *
     * @returns {ValWrapperAuth}
     */
    toJSON(): ValWrapperAuth;
    /**
     * @param {ValWrapperAuth} data ValAuth_Account toJSON data
     * @param {ValWrapperAuthExtend} extendsData Extradata of auth
     * @param {AxiosRequestConfig} axiosConfig Axios Config
     * @returns {Promise<ValWrapperAuth>}
     */
    static reauth(data: ValWrapperAuth, extendsData: ValWrapperAuthExtend, axiosConfig: AxiosRequestConfig): Promise<ValWrapperAuth>;
}
export { CookieAuth };
//# sourceMappingURL=CookieAuth.d.ts.map