//import
import { CookieJar } from 'tough-cookie';
import type { ValRequestClient, ValorantApiRequestResponse } from '@valapi/lib';

import type { ValWrapperAuth } from './Account';

//class

class AuthFlow {
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

    private clientVersion:string;
    private clientPlatfrom:string

    /**
     * Class Constructor
     * @param {ValWrapperAuth} data Account toJSON data
     * @param {String} clientVersion Client Version
     * @param {String} clientPlatfrom Client Platform
     */
    public constructor(data: ValWrapperAuth, clientVersion:string, clientPlatfrom:string) {
        this.cookie = CookieJar.fromJSON(JSON.stringify(data.cookie));
        this.access_token = data.access_token;
        this.id_token = data.id_token;
        this.expires_in = data.expires_in;
        this.token_type = data.token_type;
        this.entitlements_token = data.entitlements_token;
        this.region = data.region;
        this.multifactor = data.multifactor;
        this.isError = data.isError;

        this.clientVersion = clientVersion;
        this.clientPlatfrom = clientPlatfrom;
    }

    /**
     * @param {IValRequestClient} auth_response First Auth Response
     * @param {String} UserAgent User Agent
     * @returns {Promise<ValWrapperAuth>}
     */
     public async execute(auth_response:ValorantApiRequestResponse, UserAgent:string, RequestClient:ValRequestClient):Promise<ValWrapperAuth> {
        if(auth_response.isError){
            this.isError = true;
            return this.toJSON();
        }

        //multifactor
        if (auth_response.data.type && auth_response.data.type == 'multifactor') {
            this.multifactor = true;

            return this.toJSON();
        } else {
            this.multifactor = false;
        }

        // get asscess token
        if(!auth_response.data.response || !auth_response.data.response.parameters || !auth_response.data.response.parameters.uri){
            this.isError = true;

            return this.toJSON();
        }

        const Search_URL:URL = new URL(auth_response.data.response.parameters.uri);

        this.access_token = String(new URLSearchParams(Search_URL.hash).get('#access_token'));
        this.id_token = String(new URLSearchParams(Search_URL.hash).get('id_token'));
        this.expires_in = Number(new URLSearchParams(Search_URL.hash).get('expires_in'));
        this.token_type = String(new URLSearchParams(Search_URL.hash).get('token_type'));

        //ENTITLEMENTS
        const entitlements_response:ValorantApiRequestResponse<any> = await RequestClient.post('https://entitlements.auth.riotgames.com/api/token/v1', {}, {
            headers: {
                'Authorization': `${this.token_type} ${this.access_token}`,
                'User-Agent': String(UserAgent),
            },
        });

        this.entitlements_token = entitlements_response.data.entitlements_token;

        //REGION
        let region_response:ValorantApiRequestResponse<any> = await RequestClient.put('https://riot-geo.pas.si.riotgames.com/pas/v1/product/valorant', {
            "id_token": this.id_token,
        }, {
            headers: {
                'Authorization': `${this.token_type} ${this.access_token}`,
                'X-Riot-Entitlements-JWT': this.entitlements_token,
                'X-Riot-ClientVersion': this.clientVersion,
                'X-Riot-ClientPlatform': this.clientPlatfrom,
                'User-Agent': String(UserAgent),
            }
        });

        if(region_response.isError || !region_response.data.affinities?.pbe || !region_response.data.affinities?.live){
            region_response = {
                isError: true,
                data: {
                    affinities: {
                        pbe: 'na',
                        live: 'na',
                    }
                },
            };
        }

        this.region.pbe = region_response.data.affinities?.pbe || 'na';
        this.region.live = region_response.data.affinities?.live || 'na';

        this.cookie = new CookieJar(RequestClient.theAxios.defaults.httpsAgent.jar?.store, {
            rejectPublicSuffixes: RequestClient.theAxios.defaults.httpsAgent.options?.jar?.rejectPublicSuffixes || undefined,
        });
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
     * @param {ValorantApiRequestResponse} auth_response First Auth Response
     * @param {String} UserAgent User Agent
     * @param {String} clientVersion Client Version
     * @param {String} clientPlatfrom Client Platform
     * @returns {Promise<ValWrapperAuth>}
     */
     static async execute(data:ValWrapperAuth, auth_response:ValorantApiRequestResponse, UserAgent:string, clientVersion:string, clientPlatfrom:string, RequestClient:ValRequestClient):Promise<ValWrapperAuth> {
        const _newAuthFlow:AuthFlow = new AuthFlow(data, clientVersion, clientPlatfrom);

        try {
            return await _newAuthFlow.execute(auth_response, UserAgent, RequestClient);
        } catch (error) {
            _newAuthFlow.isError = true;

            return _newAuthFlow.toJSON();
        }
    }

    /**
     * @param {ValWrapperAuth} data Account toJSON data
     * @param {String} url Url of First Auth Response
     * @param {String} UserAgent User Agent
     * @param {String} clientVersion Client Version
     * @param {String} clientPlatfrom Client Platform
     * @returns {Promise<ValWrapperAuth>}
     */
     public static async fromUrl(data:ValWrapperAuth, url:string, UserAgent:string, clientVersion:string, clientPlatfrom:string, RequestClient:ValRequestClient):Promise<ValWrapperAuth> {
        const _newAuthFlow:AuthFlow = new AuthFlow(data, clientVersion, clientPlatfrom);

        const auth_response:ValorantApiRequestResponse<{ type: string, response: { parameters: { uri: string } } }> = {
            isError: false,
            data: {
                type: 'auth',
                response: {
                    parameters: {
                        uri: url,
                    },
                },
            },
        };

        try {
            return await _newAuthFlow.execute(auth_response, UserAgent, RequestClient);
        } catch (error) {
            _newAuthFlow.isError = true;

            return _newAuthFlow.toJSON();
        }
    }
}

//export
export { AuthFlow };