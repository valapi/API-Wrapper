import type { ValWrapperAuth, ValWrapperAuthExtend } from './Account';
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
     * Class Constructor
     * @param {ValWrapperAuth} data Account toJSON data
     */
    constructor(data: ValWrapperAuth);
    /**
    * @param {Number} verificationCode Verification Code
    * @param {ValWrapperAuthExtend} extendsData Extradata of auth
    * @returns {Promise<ValWrapperAuth>}
    */
    execute(verificationCode: number, extendsData: ValWrapperAuthExtend): Promise<ValWrapperAuth>;
    /**
     *
     * @returns {ValWrapperAuth}
     */
    toJSON(): ValWrapperAuth;
    /**
     * @param {ValWrapperAuth} data ValAuth_Account toJSON data
     * @param {Number} verificationCode Verification Code
     * @param {ValWrapperAuthExtend} extendsData Extradata of auth
     * @returns {Promise<ValWrapperAuth>}
     */
    static verify(data: ValWrapperAuth, verificationCode: number, extendsData: ValWrapperAuthExtend): Promise<ValWrapperAuth>;
}
export { Multifactor };
//# sourceMappingURL=Multifactor.d.ts.map