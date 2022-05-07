import { Event as CustomEvent } from '../client/Event';
import { type ValWrapperAxios } from '../client/AxiosClient';
import type { ValWrapperAuth } from './Account';
/**
 * * Class ID: @ing3kth/val-api/ValClient/AuthFlow
 */
declare class AuthFlow extends CustomEvent {
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
    * @param {ValWrapperAuth} data Account toJSON data
    */
    constructor(data: ValWrapperAuth);
    /**
     * @param {IAxiosClient} auth_response First Auth Response
     * @param {String} UserAgent User Agent
     * @returns {Promise<ValWrapperAuth>}
     */
    execute(auth_response: ValWrapperAxios, UserAgent: string): Promise<ValWrapperAuth>;
    /**
     *
     * @returns {ValWrapperAuth}
     */
    toJSON(): ValWrapperAuth;
    /**
     * @param {ValWrapperAuth} data Account toJSON data
     * @param {ValWrapperAxios} auth_response First Auth Response
     * @param {String} UserAgent User Agent
     * @returns {Promise<ValWrapperAuth>}
     */
    static execute(data: ValWrapperAuth, auth_response: ValWrapperAxios, UserAgent: string): Promise<ValWrapperAuth>;
    /**
     * @param {ValWrapperAuth} data Account toJSON data
     * @param {String} url Url of First Auth Response
     * @param {String} UserAgent User Agent
     * @param {String} auth_type Auth Type
     * @returns {Promise<ValWrapperAuth>}
     */
    static fromUrl(data: ValWrapperAuth, url: string, UserAgent: string, auth_type?: string): Promise<ValWrapperAuth>;
}
export { AuthFlow };
//# sourceMappingURL=AuthFlow.d.ts.map