//import
import { CookieJar } from 'tough-cookie';
import type { ValRequestClient, ValorantApiRequestResponse } from '@valapi/lib';

import type { ValWrapperAuth } from './Account';
import { AuthFlow } from "./AuthFlow";

//class

class Multifactor {
    private cookie:CookieJar;
    private access_token:string;
    private id_token:string;
    private expires_in:number;
    private token_type:string;
    private entitlements_token:string;
    private region: {
        pbe: string,
        live: string,
    }
    public multifactor:boolean;
    public isError:boolean;
    
    /**
     * Class Constructor
     * @param {ValWrapperAuth} data Account toJSON data
     */
    public constructor(data: ValWrapperAuth) {
        if(!data.multifactor){
            throw new Error('This Account is not have a Multifactor');
        }

        this.cookie = CookieJar.fromJSON(JSON.stringify(data.cookie));
        this.access_token = data.access_token;
        this.id_token = data.id_token;
        this.expires_in = data.expires_in;
        this.token_type = data.token_type;
        this.entitlements_token = data.entitlements_token;
        this.region = data.region;
        this.multifactor = data.multifactor;
        this.isError = data.isError;
    }

    /**
    * @param {Number} verificationCode Verification Code
    * @param {String} UserAgent User Agent
    * @param {String} clientVersion Client Version
    * @param {String} clientPlatfrom Client Platform
    * @returns {Promise<ValWrapperAuth>}
    */
     public async execute(verificationCode:number, UserAgent:string, clientVersion:string, clientPlatfrom:string, RequestClient:ValRequestClient):Promise<ValWrapperAuth> {
        //ACCESS TOKEN
        const auth_response:ValorantApiRequestResponse<any> = await RequestClient.put('https://auth.riotgames.com/api/v1/authorization', {
            "type": "multifactor",
            "code": String(verificationCode),
            "rememberDevice": true
        });

        if(!auth_response.isError){
            this.multifactor = false;
        }

        this.cookie = new CookieJar(RequestClient.theAxios.defaults.httpsAgent.jar?.store, {
            rejectPublicSuffixes: RequestClient.theAxios.defaults.httpsAgent.options?.jar?.rejectPublicSuffixes || undefined,
        });
        return await AuthFlow.execute(this.toJSON(), auth_response, UserAgent, clientVersion, clientPlatfrom, RequestClient);
    }

    /**
     * 
     * @returns {ValWrapperAuth}
     */
     public toJSON():ValWrapperAuth {
        return {
            cookie: this.cookie.toJSON(),
            access_token: this.access_token,
            id_token: this.id_token,
            expires_in: this.expires_in,
            token_type: this.token_type,
            entitlements_token: this.entitlements_token,
            region: this.region,
            multifactor: this.multifactor,
            isError: this.isError,
        };
    }

    /**
     * @param {ValWrapperAuth} data ValAuth_Account toJSON data
     * @param {Number} verificationCode Verification Code
     * @param {String} UserAgent User Agent
     * @param {String} clientVersion Client Version
     * @param {String} clientPlatfrom Client Platform
     * @returns {Promise<ValWrapperAuth>}
     */
     public static async verify(data:ValWrapperAuth, verificationCode:number, UserAgent:string, clientVersion:string, clientPlatfrom:string, RequestClient:ValRequestClient):Promise<ValWrapperAuth> {
        const MultifactorAccount:Multifactor = new Multifactor(data);
    
        try {
            return await MultifactorAccount.execute(verificationCode, UserAgent, clientVersion, clientPlatfrom, RequestClient);
        } catch (error) {
            MultifactorAccount.isError = true;

            return MultifactorAccount.toJSON();
        }
    }
}

//export
export { Multifactor };