//import
import { CookieJar } from 'tough-cookie';
import type { ValRequestClient, ValorantApiRequestResponse } from '@valapi/lib';

import { AuthFlow } from "./AuthFlow";

//interface

interface ValWrapperAuth {
    cookie: CookieJar.Serialized;
    access_token: string;
    id_token:string;
    expires_in: number;
    token_type: string;
    entitlements_token: string;
    region: {
        pbe: string,
        live: string,
    };
    multifactor: boolean;
    isError: boolean;
}

interface ValWrapperAuthExtend {
    UserAgent: string;
    clientVersion: string;
    clientPlatform: string;
    RequestClient: ValRequestClient;
    lockRegion: Boolean;
}

//class

class Account {
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
     * @param {ValWrapperAuth} data Authentication Data 
     */
    public constructor(data: ValWrapperAuth) {
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
     * @param {String} username Riot Account Username (not email)
     * @param {String} password Riot Account Password
     * @param {ValWrapperAuthExtend} extendsData Extradata of auth
     * @returns {Promise<ValWrapperAuth>}
     */
     public async execute(username:string, password:string, extendsData:ValWrapperAuthExtend):Promise<ValWrapperAuth> {
        await extendsData.RequestClient.post('https://auth.riotgames.com/api/v1/authorization', {
            "client_id": "play-valorant-web-prod",
            "nonce": "1",
            "redirect_uri": "https://playvalorant.com/opt_in",
            "response_mode": "query",
            "response_type": "token id_token",
            "scope": "account openid"
        }, {
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': String(extendsData.UserAgent),
            },
        });
        this.cookie = new CookieJar(extendsData.RequestClient.theAxios.defaults.httpsAgent.jar?.store, {
            rejectPublicSuffixes: extendsData.RequestClient.theAxios.defaults.httpsAgent.options?.jar?.rejectPublicSuffixes || undefined,
        });

        //ACCESS TOKEN
        const auth_response:ValorantApiRequestResponse<any> = await extendsData.RequestClient.put('https://auth.riotgames.com/api/v1/authorization', {
            'type': 'auth',
            'username': String(username),
            'password': String(password),
            'remember': true,
        });

        this.cookie = new CookieJar(extendsData.RequestClient.theAxios.defaults.httpsAgent.jar?.store, {
            rejectPublicSuffixes: extendsData.RequestClient.theAxios.defaults.httpsAgent.options?.jar?.rejectPublicSuffixes || undefined,
        });
        return await AuthFlow.execute(this.toJSON(), auth_response, extendsData);
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
     * @param {ValWrapperAuth} data Authentication Data
     * @param {String} username Riot Account Username
     * @param {String} password Riot Account Password
     * @param {ValWrapperAuthExtend} extendsData Extradata of auth
     * @returns {Promise<ValWrapperAuth>}
     */
     public static async login(data:ValWrapperAuth, username:string, password:string, extendsData:ValWrapperAuthExtend):Promise<ValWrapperAuth> {
        const NewAccount:Account = new Account(data);

        try {
            return await NewAccount.execute(username, password, extendsData);
        } catch (error) {
            NewAccount.isError = true;

            return NewAccount.toJSON();
        }
    }
}

//export
export { Account };
export type { ValWrapperAuth, ValWrapperAuthExtend };