//import
import { CustomEvent, type ValorantAPIError } from "@valapi/lib";

import axios, { type Axios, type AxiosRequestConfig, type AxiosError } from 'axios';
import type { CookieJar } from 'tough-cookie';

import { HttpsCookieAgent, HttpCookieAgent } from 'http-cookie-agent';

//update
declare module 'axios' {
    interface AxiosRequestConfig {
      jar?: CookieJar;
    }
}

//interface
interface ValWrapperAxios<ValWrapperAxiosReturn = any> {
    isError: boolean;
    data: ValWrapperAxiosReturn;
}

type ValWrapperAxiosMethod = 'get' | 'post' | 'put' | 'patch' | 'delete' ;

interface ValWrapperAxiosRequest {
    method: ValWrapperAxiosMethod;
    url: string;
    body: Object;
    config: AxiosRequestConfig;
}

//class
class AxiosClient extends CustomEvent {
    public axiosClient: Axios;

    /**
    * @param {AxiosRequestConfig} config Config
    */
    constructor(config: AxiosRequestConfig = {}) {
        super();
        if(config.jar){
            const ciphers = [
                'TLS_CHACHA20_POLY1305_SHA256',
                'TLS_AES_128_GCM_SHA256',
                'TLS_AES_256_GCM_SHA384',
                'TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256'
            ];

            if(!config.httpAgent){
                config.httpAgent = new HttpCookieAgent({ jar: config.jar, keepAlive: true });
            }

            if(!config.httpsAgent){
                config.httpsAgent = new HttpsCookieAgent({ jar: config.jar, keepAlive: true, ciphers: ciphers.join(':'), honorCipherOrder: true, minVersion: 'TLSv1.2' });
            }
        }

        if(!config.timeout){
            config.timeout = 60000; // 1 minute (60 * 1000)
        }

        this.axiosClient = axios.create(config);
        this.emit('ready');
    }

    /**
     * 
     * @param {AxiosError} error Axios Error
     * @returns 
     */
     private errorHandler(error:AxiosError):ValWrapperAxios<any> {
        //event
        this.emit('error', {
            errorCode: 'ValWrapper_Request_Error',
            message: error.message,
            data: error,
        })

        //data
        if(error.response && error.response.data){
            return {
                isError: error.isAxiosError,
                data: error.response.data,
            }
        }

        if(error.response && error.response.status && error.response.statusText){
            return {
                isError: error.isAxiosError,
                data: {
                    errorCode: error.response.status,
                    message: error.response.statusText,
                }
            }
        }

        return {
            isError: error.isAxiosError,
            data: {
                errorCode: error.name,
                message: error.message,
            }
        }
     }

    /**
    * @param {String} url URL
    * @param {AxiosRequestConfig} config Axios Config
    * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async get(url:string, config:AxiosRequestConfig = {}):Promise<ValWrapperAxios<any>> {
        //setup
        let _error = false;

        const RequestData:ValWrapperAxiosRequest = {
            method: 'get',
            url: url,
            body: {},
            config: config,
        };
        this.emit('request', RequestData);

        //request
        const _request:any = await this.axiosClient.get(url, config).catch((error:AxiosError):any => {
            return this.errorHandler(error);
            
        }).then((response:any) => {
            if(_error){
                return response;
            } else {
                return response.data;
            }
        });

        //return
        return {
            isError: _error,
            data: _request,
        };
    }

    /**
    * @param {String} url URL
    * @param {Object} body Body
    * @param {AxiosRequestConfig} config Axios Config
    * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async post(url:string, body:object = {}, config:AxiosRequestConfig = {}):Promise<ValWrapperAxios<any>> {
        //setup
        let _error = false;

        const RequestData:ValWrapperAxiosRequest = {
            method: 'post',
            url: url,
            body: body,
            config: config,
        };
        this.emit('request', RequestData);

        //request
        const _request:any = await this.axiosClient.post(url, body, config).catch((error:AxiosError):any => {
            return this.errorHandler(error);
            
        }).then((response:any) => {
            if(_error){
                return response;
            } else {
                return response.data;
            }
        });

        //return
        return {
            isError: _error,
            data: _request,
        };
    }

    /**
    * @param {String} url URL
    * @param {Object} body Body
    * @param {AxiosRequestConfig} config Axios Config
    * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async put(url:string, body:object = {}, config:AxiosRequestConfig = {}):Promise<ValWrapperAxios<any>> {
        //setup
        let _error = false;

        const RequestData:ValWrapperAxiosRequest = {
            method: 'put',
            url: url,
            body: body,
            config: config,
        };
        this.emit('request', RequestData);

        //request
        const _request:any = await this.axiosClient.put(url, body, config).catch((error:AxiosError):any => {
            return this.errorHandler(error);
            
        }).then((response:any) => {
            if(_error){
                return response;
            } else {
                return response.data;
            }
        });

        //return
        return {
            isError: _error,
            data: _request,
        };
    }

    /**
    * @param {String} url URL
    * @param {Object} body Body
    * @param {AxiosRequestConfig} config Axios Config
    * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async patch(url:string, body:object = {}, config:AxiosRequestConfig = {}):Promise<ValWrapperAxios<any>> {
        //setup
        let _error = false;

        const RequestData:ValWrapperAxiosRequest = {
            method: 'patch',
            url: url,
            body: body,
            config: config,
        };
        this.emit('request', RequestData);

        //request
        const _request:any = await this.axiosClient.patch(url, body, config).catch((error:AxiosError):any => {
            return this.errorHandler(error);
            
        }).then((response:any) => {
            if(_error){
                return response;
            } else {
                return response.data;
            }
        });

        //return
        return {
            isError: _error,
            data: _request,
        };
    }

    /**
    * @param {String} url URL
    * @param {AxiosRequestConfig} config Axios Config
    * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async delete(url:string, config:AxiosRequestConfig = {}):Promise<ValWrapperAxios<any>> {
        //setup
        let _error = false;

        const RequestData:ValWrapperAxiosRequest = {
            method: 'delete',
            url: url,
            body: {},
            config: config,
        };
        this.emit('request', RequestData);

        //request
        const _request:any = await this.axiosClient.post(url, config).catch((error:AxiosError):any => {
            return this.errorHandler(error);
            
        }).then((response:any) => {
            if(_error){
                return response;
            } else {
                return response.data;
            }
        });

        //return
        return {
            isError: _error,
            data: _request,
        };
    }
}

//event

interface ValWrapperAxiosEvent {
    'ready': () => void;
    'request': (data: ValWrapperAxiosRequest) => void;
    'error': (data: ValorantAPIError) => void;
}

declare interface AxiosClient {
    emit<EventName extends keyof ValWrapperAxiosEvent>(name: EventName, ...args: Parameters<ValWrapperAxiosEvent[EventName]>): void;
    on<EventName extends keyof ValWrapperAxiosEvent>(name: EventName, callback: ValWrapperAxiosEvent[EventName]): void;
    once<EventName extends keyof ValWrapperAxiosEvent>(name: EventName, callback: ValWrapperAxiosEvent[EventName]): void;
    off<EventName extends keyof ValWrapperAxiosEvent>(name: EventName, callback?: ValWrapperAxiosEvent[EventName]): void;
}

//export
export { AxiosClient };
export type { ValWrapperAxios, ValWrapperAxiosMethod, ValWrapperAxiosRequest, ValWrapperAxiosEvent };