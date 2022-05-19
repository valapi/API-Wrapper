import type { ValWrapperAuth } from './Account';
declare class Multifactor {
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
    * @param {Number} verificationCode Verification Code
    * @param {String} UserAgent User Agent
    * @param {String} clientVersion Client Version
    * @param {String} clientPlatfrom Client Platform
    * @returns {Promise<ValWrapperAuth>}
    */
    execute(verificationCode: number, UserAgent: string, clientVersion: string, clientPlatfrom: string): Promise<ValWrapperAuth>;
    /**
     *
     * @returns {ValWrapperAuth}
     */
    toJSON(): ValWrapperAuth;
    /**
     * @param {ValWrapperAuth} data ValAuth_Account toJSON data
     * @param {Number} verificationCode Verification Code
     * @param {String} UserAgent User Agent
     * @param {String} clientVersion Client Version
     * @param {String} clientPlatfrom Client Platform
     * @returns {Promise<ValWrapperAuth>}
     */
    static verify(data: ValWrapperAuth, verificationCode: number, UserAgent: string, clientVersion: string, clientPlatfrom: string): Promise<ValWrapperAuth>;
}
export { Multifactor };
//# sourceMappingURL=Multifactor.d.ts.map