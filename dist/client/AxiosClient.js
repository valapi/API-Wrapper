"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AxiosClient = void 0;
//import
const lib_1 = require("@valapi/lib");
const axios_1 = __importDefault(require("axios"));
const http_cookie_agent_1 = require("http-cookie-agent");
//class
class AxiosClient extends lib_1.CustomEvent {
    /**
    * @param {AxiosRequestConfig} config Config
    */
    constructor(config = {}) {
        super();
        if (config.jar) {
            const ciphers = [
                'TLS_CHACHA20_POLY1305_SHA256',
                'TLS_AES_128_GCM_SHA256',
                'TLS_AES_256_GCM_SHA384',
                'TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256'
            ];
            if (!config.httpAgent) {
                config.httpAgent = new http_cookie_agent_1.HttpCookieAgent({ jar: config.jar, keepAlive: true });
            }
            if (!config.httpsAgent) {
                config.httpsAgent = new http_cookie_agent_1.HttpsCookieAgent({ jar: config.jar, keepAlive: true, ciphers: ciphers.join(':'), honorCipherOrder: true, minVersion: 'TLSv1.2' });
            }
        }
        if (!config.timeout) {
            config.timeout = 60000; // 1 minute (60 * 1000)
        }
        this.axiosClient = axios_1.default.create(config);
        this.emit('ready');
    }
    /**
     *
     * @param {AxiosError} error Axios Error
     * @returns
     */
    errorHandler(error) {
        //event
        this.emit('error', {
            errorCode: 'ValWrapper_Request_Error',
            message: error.message,
            data: error,
        });
        //data
        if (error.response && error.response.data) {
            return {
                isError: error.isAxiosError,
                data: error.response.data,
            };
        }
        if (error.response && error.response.status && error.response.statusText) {
            return {
                isError: error.isAxiosError,
                data: {
                    errorCode: error.response.status,
                    message: error.response.statusText,
                }
            };
        }
        return {
            isError: error.isAxiosError,
            data: {
                errorCode: error.name,
                message: error.message,
            }
        };
    }
    /**
    * @param {String} url URL
    * @param {AxiosRequestConfig} config Axios Config
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    get(url, config = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            //setup
            let _error = false;
            const RequestData = {
                method: 'get',
                url: url,
                body: {},
                config: config,
            };
            this.emit('request', RequestData);
            //request
            const _request = yield this.axiosClient.get(url, config).catch((error) => {
                return this.errorHandler(error);
            }).then((response) => {
                if (_error) {
                    return response;
                }
                else {
                    return response.data;
                }
            });
            //return
            return {
                isError: _error,
                data: _request,
            };
        });
    }
    /**
    * @param {String} url URL
    * @param {Object} body Body
    * @param {AxiosRequestConfig} config Axios Config
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    post(url, body = {}, config = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            //setup
            let _error = false;
            const RequestData = {
                method: 'post',
                url: url,
                body: body,
                config: config,
            };
            this.emit('request', RequestData);
            //request
            const _request = yield this.axiosClient.post(url, body, config).catch((error) => {
                return this.errorHandler(error);
            }).then((response) => {
                if (_error) {
                    return response;
                }
                else {
                    return response.data;
                }
            });
            //return
            return {
                isError: _error,
                data: _request,
            };
        });
    }
    /**
    * @param {String} url URL
    * @param {Object} body Body
    * @param {AxiosRequestConfig} config Axios Config
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    put(url, body = {}, config = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            //setup
            let _error = false;
            const RequestData = {
                method: 'put',
                url: url,
                body: body,
                config: config,
            };
            this.emit('request', RequestData);
            //request
            const _request = yield this.axiosClient.put(url, body, config).catch((error) => {
                return this.errorHandler(error);
            }).then((response) => {
                if (_error) {
                    return response;
                }
                else {
                    return response.data;
                }
            });
            //return
            return {
                isError: _error,
                data: _request,
            };
        });
    }
    /**
    * @param {String} url URL
    * @param {Object} body Body
    * @param {AxiosRequestConfig} config Axios Config
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    patch(url, body = {}, config = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            //setup
            let _error = false;
            const RequestData = {
                method: 'patch',
                url: url,
                body: body,
                config: config,
            };
            this.emit('request', RequestData);
            //request
            const _request = yield this.axiosClient.patch(url, body, config).catch((error) => {
                return this.errorHandler(error);
            }).then((response) => {
                if (_error) {
                    return response;
                }
                else {
                    return response.data;
                }
            });
            //return
            return {
                isError: _error,
                data: _request,
            };
        });
    }
    /**
    * @param {String} url URL
    * @param {AxiosRequestConfig} config Axios Config
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    delete(url, config = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            //setup
            let _error = false;
            const RequestData = {
                method: 'delete',
                url: url,
                body: {},
                config: config,
            };
            this.emit('request', RequestData);
            //request
            const _request = yield this.axiosClient.post(url, config).catch((error) => {
                return this.errorHandler(error);
            }).then((response) => {
                if (_error) {
                    return response;
                }
                else {
                    return response.data;
                }
            });
            //return
            return {
                isError: _error,
                data: _request,
            };
        });
    }
}
exports.AxiosClient = AxiosClient;
//# sourceMappingURL=AxiosClient.js.map