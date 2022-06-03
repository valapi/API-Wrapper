import type { ValRequestClient, ValorantApiRequestResponse } from '@valapi/lib';
import type { ValWrapperAuth, ValWrapperAuthExtend } from './Account';
declare class AuthFlow {
    private cookie;
    private access_token;
    private id_token;
    private expires_in;
    private token_type;
    private entitlements_token;
    private region;
    multifactor: boolean;
    isError: boolean;
    private clientVersion;
    private clientPlatfrom;
    /**
     * Class Constructor
     * @param {ValWrapperAuth} data Account toJSON data
     * @param {String} clientVersion Client Version
     * @param {String} clientPlatfrom Client Platform
     */
    constructor(data: ValWrapperAuth, clientVersion: string, clientPlatfrom: string);
    /**
     * @param {IValRequestClient} auth_response First Auth Response
     * @param {String} UserAgent User Agent
     * @param {ValRequestClient} RequestClient Request Client
     * @param {Boolean} lockRegion Lock Region
     * @returns {Promise<ValWrapperAuth>}
     */
    execute(auth_response: ValorantApiRequestResponse, UserAgent: string, RequestClient: ValRequestClient, lockRegion: Boolean): Promise<ValWrapperAuth>;
    /**
     *
     * @returns {ValWrapperAuth}
     */
    toJSON(): ValWrapperAuth;
    /**
     * @param {ValWrapperAuth} data Account toJSON data
     * @param {ValorantApiRequestResponse} auth_response First Auth Response
     * @param {ValWrapperAuthExtend} extendsData Extradata of auth
     * @returns {Promise<ValWrapperAuth>}
     */
    static execute(data: ValWrapperAuth, auth_response: ValorantApiRequestResponse, extendsData: ValWrapperAuthExtend): Promise<ValWrapperAuth>;
    /**
     * @param {ValWrapperAuth} data Account toJSON data
     * @param {String} url Url of First Auth Response
     * @param {ValWrapperAuthExtend} extendsData Extradata of auth
     * @returns {Promise<ValWrapperAuth>}
     */
    static fromUrl(data: ValWrapperAuth, url: string, extendsData: ValWrapperAuthExtend): Promise<ValWrapperAuth>;
}
export { AuthFlow };
//# sourceMappingURL=AuthFlow.d.ts.map