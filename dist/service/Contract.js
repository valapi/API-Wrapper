"use strict";
//import
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contract = void 0;
const tslib_1 = require("tslib");
//service
class Contract {
    /**
     *
     * @param {ValRequestClient} ValRequestClient Request Client
     * @param {ValRegion.Json} Region Region Service Data
     */
    constructor(ValRequestClient, Region) {
        this.RequestClient = ValRequestClient;
        this.Region = Region;
    }
    /**
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    DefinitionsFetch() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(`${this.Region.url.playerData}/contract-definitions/v3/item-upgrades`);
        });
    }
    /**
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    FetchActiveStory() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(`${this.Region.url.playerData}/contract-definitions/v2/definitions/story`);
        });
    }
    /**
     * @param {string} puuid Player UUID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    Fetch(puuid) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(`${this.Region.url.playerData}/contracts/v1/contracts/${puuid}`);
        });
    }
    /**
     * @param {string} puuid Player UUID
     * @param {string} contractId Contract ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    Activate(puuid, contractId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.post(`${this.Region.url.playerData}/contracts/v1/contracts/${puuid}/special/${contractId}`);
        });
    }
}
exports.Contract = Contract;
