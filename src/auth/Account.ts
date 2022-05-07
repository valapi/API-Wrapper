//import
import { CookieJar } from 'tough-cookie';

import { CustomEvent } from "@valapi/lib";
import { AxiosClient, type ValWrapperAxios } from '../client/AxiosClient';
import { AuthFlow } from "./AuthFlow";

//interface

interface ValWrapperAuth {
    cookie: CookieJar.Serialized,
    access_token: string,
    id_token:string,
    expires_in: number,
    token_type: string,
    entitlements_token: string,
    region: {
        pbe: string,
        live: string,
    },
    multifactor: boolean,
    isError: boolean,
}

//class

/**
 * * Class ID: @ing3kth/valapi/ValClient/Account
 */
class Account extends CustomEvent {
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

    constructor() {
        super();
        this.cookie = new CookieJar();
        this.access_token = '';
        this.id_token = '';
        this.expires_in = 3600;
        this.token_type = '';
        this.entitlements_token = '';
        this.region = {
            pbe: '',
            live: '',
        }
        this.multifactor = false;
        this.isError = false;
    }

    /**
     * @param {String} username Riot Account Username (not email)
     * @param {String} password Riot Account Password
     * @param {String} UserAgent User Agent
     * @returns {Promise<ValWrapperAuth>}
     */
     public async execute(username:string, password:string, UserAgent:string):Promise<ValWrapperAuth> {
        const axiosClient:AxiosClient = new AxiosClient({
            jar: this.cookie,
            withCredentials: true,
            headers: {
                'User-Agent': UserAgent,
            }
        });

        await axiosClient.post('https://auth.riotgames.com/api/v1/authorization', {
            "client_id": "play-valorant-web-prod",
            "nonce": "1",
            "redirect_uri": "https://playvalorant.com/opt_in",
            "response_type": "token id_token",
            "scope": "account openid"
        }, {
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': UserAgent
            },
        });

        //ACCESS TOKEN
        const auth_response:ValWrapperAxios<any> = await axiosClient.put('https://auth.riotgames.com/api/v1/authorization', {
            'type': 'auth',
            'username': username,
            'password': password,
            'remember': true,
        });

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
     * @param {String} username Riot Account Username
     * @param {String} password Riot Account Password
     * @param {String} UserAgent User Agent
     * @returns {Promise<ValWrapperAuth>}
     */
     public static async login(username:string, password:string, UserAgent:string):Promise<ValWrapperAuth> {
        const NewAccount:Account = new Account();

        return await NewAccount.execute(username, password, UserAgent);
    }
}

//export
export { Account };
export type { ValWrapperAuth };