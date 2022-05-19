//import
import { CookieJar } from 'tough-cookie';

import { AxiosClient } from '../client/AxiosClient';
import { AuthFlow } from "./AuthFlow";

import { ValWrapperAuth } from './Account';
import type { Axios } from 'axios';

//class

/**
 * * Not Recommend
 */
class CookieAuth {
    private cookie:CookieJar;
    private access_token:string;
    private id_token:string;
    private expires_in:number;
    private token_type:string;
    private entitlements_token:string;
    private region: {
        pbe: string,
        live: string,
    };
    public multifactor:boolean;
    public isError:boolean;
    
    /**
    * @param {ValWrapperAuth} data Account toJSON data
    */
    constructor(data: ValWrapperAuth) {
        if(data.multifactor){
            throw new Error('This Account is have a Multifactor');
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
     * @param {String} UserAgent User Agent
     * @param {String} clientVersion Client Version
     * @param {String} clientPlatfrom Client Platform
     * @returns {Promise<any>}
     */
     public async execute(UserAgent:string, clientVersion:string, clientPlatfrom:string):Promise<any> {
        const axiosClient:Axios = new AxiosClient({
            jar: this.cookie,
            withCredentials: true,
            headers: {
                'User-Agent': UserAgent,
            },
            maxRedirects: 1,
        }).axiosClient;

        //Cookie Reauth
        try{
            await axiosClient.get('https://auth.riotgames.com/authorize?redirect_uri=https%3A%2F%2Fplayvalorant.com%2Fopt_in&client_id=play-valorant-web-prod&response_type=token%20id_token&nonce=1')
        }catch(err:any){
            return await AuthFlow.fromUrl(this.toJSON(), err.request._currentUrl as string, UserAgent, clientVersion, clientPlatfrom);
        }

        return this.toJSON();
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
     * @param {String} UserAgent User Agent
     * @param {String} clientVersion Client Version
     * @param {String} clientPlatfrom Client Platform
     * @returns {Promise<ValWrapperAuth>}
     */
     public static async reauth(data:ValWrapperAuth, UserAgent:string, clientVersion:string, clientPlatfrom:string):Promise<ValWrapperAuth> {
        const CookieAccount:CookieAuth = new CookieAuth(data);
        
        try {
            return await CookieAccount.execute(UserAgent, clientVersion, clientPlatfrom);
        } catch (error) {
            CookieAccount.isError = true;

            return CookieAccount.toJSON();
        }
    }
}

//export
export { CookieAuth };