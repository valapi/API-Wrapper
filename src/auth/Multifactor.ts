//import
import { CookieJar } from 'tough-cookie';

import { CustomEvent } from "@valapi/lib";
import { AxiosClient, type ValWrapperAxios } from '../client/AxiosClient';
import { AuthFlow } from "./AuthFlow";

import type { ValWrapperAuth } from './Account';

//class
class Multifactor extends CustomEvent {
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
    * @param {ValWrapperAuth} data Account toJSON data
    */
    constructor(data: ValWrapperAuth) {
        super();
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
    * @returns {Promise<ValWrapperAuth>}
    */
     public async execute(verificationCode:number, UserAgent:string):Promise<ValWrapperAuth> {
        const axiosClient:AxiosClient = new AxiosClient({
            jar: this.cookie,
            withCredentials: true,
            headers: {
                'User-Agent': UserAgent,
            },
            timeout: this.expires_in * 1000,
        });

        //ACCESS TOKEN
        const auth_response:ValWrapperAxios<any> = await axiosClient.put('https://auth.riotgames.com/api/v1/authorization', {
            "type": "multifactor",
            "code": verificationCode.toString(),
            "rememberDevice": true
        });

        if(!auth_response.isError){
            this.multifactor = false;
        }

        return await AuthFlow.execute(this.toJSON(), auth_response, UserAgent);
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
    * @returns {Promise<ValWrapperAuth>}
    */
     public static async verify(data:ValWrapperAuth, verificationCode:number, UserAgent:string):Promise<ValWrapperAuth> {
        const MultifactorAccount:Multifactor = new Multifactor(data);
        return await MultifactorAccount.execute(verificationCode, UserAgent);
    }
}

//export
export { Multifactor };