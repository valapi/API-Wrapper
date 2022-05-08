import { CustomEvent } from "@valapi/lib";
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
}
declare type ValWrapperAxiosMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';
interface ValWrapperAxiosError {
    errorCode: string;
    message: string;
    data: any;
}
interface ValWrapperAxiosRequest {
    method: ValWrapperAxiosMethod;
    url: string;
    body: Object;
    config: AxiosRequestConfig;
}
declare class AxiosClient extends CustomEvent {
    axiosClient: Axios;
    /**
    * @param {AxiosRequestConfig} config Config
    */
    constructor(config?: AxiosRequestConfig);
    /**
     *
     * @param {AxiosError} error Axios Error
     * @returns
     */
    private errorHandler;
    /**
    * @param {String} url URL
    * @param {AxiosRequestConfig} config Axios Config
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    get(url: string, config?: AxiosRequestConfig): Promise<ValWrapperAxios<any>>;
    /**
    * @param {String} url URL
    * @param {Object} body Body
    * @param {AxiosRequestConfig} config Axios Config
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    post(url: string, body?: object, config?: AxiosRequestConfig): Promise<ValWrapperAxios<any>>;
    /**
    * @param {String} url URL
    * @param {Object} body Body
    * @param {AxiosRequestConfig} config Axios Config
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    put(url: string, body?: object, config?: AxiosRequestConfig): Promise<ValWrapperAxios<any>>;
    /**
    * @param {String} url URL
    * @param {Object} body Body
    * @param {AxiosRequestConfig} config Axios Config
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    patch(url: string, body?: object, config?: AxiosRequestConfig): Promise<ValWrapperAxios<any>>;
    /**
    * @param {String} url URL
    * @param {AxiosRequestConfig} config Axios Config
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    delete(url: string, config?: AxiosRequestConfig): Promise<ValWrapperAxios<any>>;
}
interface ValWrapperAxiosEvent {
    'ready': () => void;
    'request': (data: ValWrapperAxiosRequest) => void;
    'error': (data: ValWrapperAxiosError) => void;
}
declare interface AxiosClient {
    emit<EventName extends keyof ValWrapperAxiosEvent>(name: EventName, ...args: Parameters<ValWrapperAxiosEvent[EventName]>): void;
    on<EventName extends keyof ValWrapperAxiosEvent>(name: EventName, callback: ValWrapperAxiosEvent[EventName]): void;
    once<EventName extends keyof ValWrapperAxiosEvent>(name: EventName, callback: ValWrapperAxiosEvent[EventName]): void;
    off<EventName extends keyof ValWrapperAxiosEvent>(name: EventName, callback?: ValWrapperAxiosEvent[EventName]): void;
}
export { AxiosClient };
export type { ValWrapperAxios, ValWrapperAxiosMethod, ValWrapperAxiosError, ValWrapperAxiosRequest, ValWrapperAxiosEvent };
//# sourceMappingURL=AxiosClient.d.ts.map