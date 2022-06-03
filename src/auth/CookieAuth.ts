//import
import { CookieJar } from 'tough-cookie';
import type { ValRequestClient } from '@valapi/lib';

import type { ValWrapperAuth, ValWrapperAuthExtend } from './Account';
import { AuthFlow } from "./AuthFlow";

import axios, { type AxiosRequestConfig } from 'axios';

//class

/**
 * * Not Recommend
 */
class CookieAuth {
    private cookie: CookieJar;
    private access_token: string;
    private id_token: string;
    private expires_in: number;
    private token_type: string;
    private entitlements_token: string;
    private region: {
        pbe: string,
        live: string,
    };
    public multifactor: boolean;
    public isError: boolean;

    /**
     * Class Constructor
     * @param {ValWrapperAuth} data Account toJSON data
     */
    public constructor(data: ValWrapperAuth) {
        if (data.multifactor) {
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
     * 
     * @param {Array<string>} ULRs Url list
     * @returns {string | undefined}
     */
    private tranferURL(ULRs: Array<string>): string | undefined {
        let UrlList: Array<{ score: number, url: string }> = [];

        for (let myUrl of ULRs) {
            if (!myUrl.includes('access_token=')) {
                continue;
            }

            //check
            if (myUrl.startsWith('#')) {
                myUrl = myUrl;
            }

            if (myUrl.includes('playvalorant.com/opt_in')) {
                let replaceString = '';
                for (let i = 0; i < myUrl.length; i++) {
                    replaceString += myUrl.at(i);
                    if ((myUrl.at(i)) === 'h' && (myUrl.at(i + 1)) === 't' && (myUrl.at(i + 2)) === 't' && (myUrl.at(i + 3)) === 'p') {
                        myUrl = myUrl.replace(replaceString + 1, '');
                    }
                }

                myUrl = myUrl;
            }

            //url score
            let urlScore: number = 0;

            if (myUrl.includes('access_token')) {
                urlScore += 2;
            }
            if (myUrl.includes('id_token')) {
                urlScore += 2;
            }
            if (myUrl.includes('token_type')) {
                urlScore += 2;
            }
            if (myUrl.includes('expires_in')) {
                urlScore += 1;
            }

            UrlList.push({
                score: urlScore,
                url: String(myUrl),
            });
        }

        //sort with score from most to worst
        UrlList = UrlList.sort((a, b) => {
            return b.score - a.score;
        });

        return UrlList[0].url;
    }

    /**
     * @param {ValWrapperAuthExtend} extendsData Extradata of auth
     * @returns {Promise<any>}
     */
    public async execute(extendsData:ValWrapperAuthExtend, axiosConfig:AxiosRequestConfig): Promise<any> {
        if(axiosConfig.maxRedirects !== 1 && axiosConfig.maxRedirects !== 0) {
            axiosConfig.maxRedirects = 0;
        }
        const axiosClient = axios.create(axiosConfig);

        //Cookie Reauth
        let _URL: string = '';

        try {
            await axiosClient.get('https://auth.riotgames.com/authorize?redirect_uri=https%3A%2F%2Fplayvalorant.com%2Fopt_in&client_id=play-valorant-web-prod&response_type=token%20id_token&nonce=1', {
                headers: {
                    'X-Riot-ClientVersion': String(extendsData.clientVersion),
                    'X-Riot-ClientPlatform': String(extendsData.clientPlatform),
                    'User-Agent': String(extendsData.UserAgent),
                },
                timeout: 0,
            });
        } catch (error: any) {
            if (error.config.maxRedirects === 0) {
                const possible_location = [
                    error.response.headers.location,
                    error.response.data,
                ] as Array<string>;
                _URL = this.tranferURL(possible_location) || possible_location[0];
            } else if (error.config.maxRedirects === 1) {
                const possible_location = [
                    error.request._options.hash,
                    error.request._options.href,
                    error.request._currentUrl,
                ] as Array<string>;
                _URL = this.tranferURL(possible_location) || possible_location[2];
            } else {
                this.isError = true;
            }
        }

        this.cookie = new CookieJar(axiosClient.defaults.httpsAgent.jar?.store, {
            rejectPublicSuffixes: axiosClient.defaults.httpsAgent.options?.jar?.rejectPublicSuffixes || undefined,
        });
        return await AuthFlow.fromUrl(this.toJSON(), _URL, extendsData);
    }

    /**
     * 
     * @returns {ValWrapperAuth}
     */
    public toJSON(): ValWrapperAuth {
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
     * @param {ValWrapperAuthExtend} extendsData Extradata of auth
     * @param {AxiosRequestConfig} axiosConfig Axios Config
     * @returns {Promise<ValWrapperAuth>}
     */
    public static async reauth(data: ValWrapperAuth, extendsData:ValWrapperAuthExtend, axiosConfig:AxiosRequestConfig): Promise<ValWrapperAuth> {
        const CookieAccount: CookieAuth = new CookieAuth(data);

        try {
            return await CookieAccount.execute(extendsData, axiosConfig);
        } catch (error) {
            CookieAccount.isError = true;

            return CookieAccount.toJSON();
        }
    }
}

//export
export { CookieAuth };