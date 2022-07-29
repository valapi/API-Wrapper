"use strict";
//import
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const tslib_1 = require("tslib");
//service
class Client {
    /**
     *
     * @param {ValRequestClient} ValRequestClient Request Client
     * @param {ValRegion.Json} Region Region Service Data
     */
    constructor(ValRequestClient, Region) {
        this.RequestClient = ValRequestClient;
        this.Region = Region;
    }
    //PVP Endpoints
    /**
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    FetchContent() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(`${this.Region.url.sharedData}/content-service/v3/content`);
        });
    }
    /**
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    FetchConfig() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(`${this.Region.url.sharedData}/v1/config/${this.Region.data.api}`);
        });
    }
}
exports.Client = Client;
