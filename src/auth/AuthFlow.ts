//import
import { CookieJar } from 'tough-cookie';

import { Event as CustomEvent } from '../client/Event';
import { AxiosClient, type ValWrapperAxios } from '../client/AxiosClient';

import type { ValWrapperAuth } from './Account';

//class

/**
 * * Class ID: @ing3kth/valapi/ValClient/AuthFlow
 */
class AuthFlow extends CustomEvent {
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
        super();
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
     * @param {IAxiosClient} auth_response First Auth Response
     * @param {String} UserAgent User Agent
     * @returns {Promise<ValWrapperAuth>}
     */
     public async execute(auth_response:ValWrapperAxios, UserAgent:string):Promise<ValWrapperAuth> {
        if(auth_response.isError){
            this.isError = true;
            return this.toJSON();
        }

        const axiosClient:AxiosClient = new AxiosClient({
            jar: this.cookie,
            withCredentials: true,
            timeout: this.expires_in * 1000,
        });

        //multifactor
        if (auth_response.data.type && auth_response.data.type == 'multifactor') {
            this.multifactor = true;

            return this.toJSON();
        } else {
            this.multifactor = false;
        }

        // get asscess token
        const Search_URL:URL = new URL(auth_response.data.response.parameters.uri);

        this.access_token = String(new URLSearchParams(Search_URL.hash).get('#access_token'));
        this.id_token = String(new URLSearchParams(Search_URL.hash).get('id_token'));
        this.expires_in = Number(new URLSearchParams(Search_URL.hash).get('expires_in'));
        this.token_type = String(new URLSearchParams(Search_URL.hash).get('token_type'));

        //ENTITLEMENTS
        const entitlements_response:ValWrapperAxios<any> = await axiosClient.post('https://entitlements.auth.riotgames.com/api/token/v1', {}, {
            headers: {
                'Authorization': `${this.token_type} ${this.access_token}`,
                'User-Agent': UserAgent,
            },
        });

        this.entitlements_token = entitlements_response.data.entitlements_token;

        //REGION
        const region_response:ValWrapperAxios<any> = await axiosClient.put('https://riot-geo.pas.si.riotgames.com/pas/v1/product/valorant', {
            "id_token": this.id_token,
        }, {
            headers: {
                'Authorization': `${this.token_type} ${this.access_token}`,
            }
        });

        if(region_response.isError === true){
            this.region = {
                pbe: 'na',
                live: 'na',
            }

            return this.toJSON();
        }

        this.region.pbe = region_response.data.affinities.pbe;
        this.region.live = region_response.data.affinities.live;
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
     * @param {ValWrapperAuth} data Account toJSON data
     * @param {ValWrapperAxios} auth_response First Auth Response
     * @param {String} UserAgent User Agent
     * @returns {Promise<ValWrapperAuth>}
     */
     static async execute(data:ValWrapperAuth, auth_response:ValWrapperAxios, UserAgent:string):Promise<ValWrapperAuth> {
        const _newAuthFlow:AuthFlow = new AuthFlow(data);
        return await _newAuthFlow.execute(auth_response, UserAgent);
    }

    /**
     * @param {ValWrapperAuth} data Account toJSON data
     * @param {String} url Url of First Auth Response
     * @param {String} UserAgent User Agent
     * @param {String} auth_type Auth Type
     * @returns {Promise<ValWrapperAuth>}
     */
     public static async fromUrl(data:ValWrapperAuth, url:string, UserAgent:string, auth_type:string = 'auth'):Promise<ValWrapperAuth> {
        const _newAuthFlow:AuthFlow = new AuthFlow(data);

        const auth_response:ValWrapperAxios<{ type: string, response: { parameters: { uri: string } } }> = {
            isError: false,
            data: {
                type: auth_type,
                response: {
                    parameters: {
                        uri: url,
                    },
                },
            },
        };

        return await _newAuthFlow.execute(auth_response, UserAgent);
    }
}

//export
export { AuthFlow };