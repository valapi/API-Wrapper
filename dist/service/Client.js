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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
//import
const AxiosClient_1 = require("../client/AxiosClient");
const lib_1 = require("@valapi/lib");
//service
class Client extends lib_1.CustomEvent {
    /**
    * @param {ValWrapperService} data Services Data
    */
    constructor(data) {
        super();
        this.AxiosClient = new AxiosClient_1.AxiosClient(data.AxiosData);
        this.AxiosClient.on('error', ((data) => {
            this.emit('error', data);
        }));
        this.Region = data.Region;
    }
    //SESSION
    /**
    * @param {String} puuid Player UUID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    GetSession(puuid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.AxiosClient.get(this.Region.url.partyService + `/session/v1/sessions/${puuid}`);
        });
    }
    //PVP Endpoints
    /**
     * @returns {Promise<ValWrapperAxios<any>>}
    */
    FetchContent() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.AxiosClient.get(this.Region.url.sharedData + `/content-service/v3/content`);
        });
    }
    /**
     * @returns {Promise<ValWrapperAxios<any>>}
    */
    FetchConfig() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.AxiosClient.get(this.Region.url.sharedData + `/v1/config/${this.Region.data.api}`);
        });
    }
}
exports.Client = Client;
//# sourceMappingURL=Client.js.map