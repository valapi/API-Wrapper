import { CustomEvent, type ValorantAPIError } from "@valapi/lib";
import { type Axios, type AxiosRequestConfig } from 'axios';
import type { CookieJar } from 'tough-cookie';
declare module 'axios' {
    interface AxiosRequestConfig {
        jar?: CookieJar;
    }
}
interface ValWrapperAxios<ValWrapperAxiosReturn = any> {
    isError: boolean;
    data: ValWrapperAxiosReturn;
    fullData?: any;
}
declare type ValWrapperAxiosMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';
interface ValWrapperAxiosRequest {
    method: ValWrapperAxiosMethod;
    url: string;
    body: Object;
    config: AxiosRequestConfig;
}
declare class AxiosClient extends CustomEvent {
    axiosClient: Axios;
    /**
     * Class Constructor
     * @param {AxiosRequestConfig} config Config
     */
    constructor(config?: AxiosRequestConfig);
    /**
     *
     * @param {AxiosError} error Axios Error
     * @returns {ValWrapperAxios}
     */
    private errorHandler;
    /**
    * @param {String} url URL
    * @param {AxiosRequestConfig} config Axios Config
    * @returns {Promise<ValWrapperAxios>}
    */
    get(url: string, config?: AxiosRequestConfig): Promise<ValWrapperAxios<any>>;
    /**
    * @param {String} url URL
    * @param {Object} body Body
    * @param {AxiosRequestConfig} config Axios Config
    * @returns {Promise<ValWrapperAxios>}
    */
    post(url: string, body?: object, config?: AxiosRequestConfig): Promise<ValWrapperAxios<any>>;
    /**
    * @param {String} url URL
    * @param {Object} body Body
    * @param {AxiosRequestConfig} config Axios Config
    * @returns {Promise<ValWrapperAxios>}
    */
    put(url: string, body?: object, config?: AxiosRequestConfig): Promise<ValWrapperAxios<any>>;
    /**
    * @param {String} url URL
    * @param {Object} body Body
    * @param {AxiosRequestConfig} config Axios Config
    * @returns {Promise<ValWrapperAxios>}
    */
    patch(url: string, body?: object, config?: AxiosRequestConfig): Promise<ValWrapperAxios<any>>;
    /**
    * @param {String} url URL
    * @param {AxiosRequestConfig} config Axios Config
    * @returns {Promise<ValWrapperAxios>}
    */
    delete(url: string, config?: AxiosRequestConfig): Promise<ValWrapperAxios<any>>;
}
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
export { AxiosClient };
export type { ValWrapperAxios, ValWrapperAxiosMethod, ValWrapperAxiosRequest, ValWrapperAxiosEvent };
//# sourceMappingURL=AxiosClient.d.ts.map