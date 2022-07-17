"use strict";
//import
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contract = void 0;
const tslib_1 = require("tslib");
//service
class Contract {
    /**
     * Class Constructor
     * @param {ValRequestClient} ValRequestClient Services Data
     * @param {ValorantApiRegion} Region Services Data
     */
    constructor(ValRequestClient, Region) {
        this.RequestClient = ValRequestClient;
        this.Region = Region;
    }
    /**
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    DefinitionsFetch() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(this.Region.url.playerData + `/contract-definitions/v3/item-upgrades`);
        });
    }
    /**
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    FetchActiveStory() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(this.Region.url.playerData + `/contract-definitions/v2/definitions/story`);
        });
    }
    /**
     * @param {string} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    Fetch(puuid) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(this.Region.url.playerData + `/contracts/v1/contracts/${puuid}`);
        });
    }
    /**
     * @param {string} puuid Player UUID
     * @param {string} contractId Contract ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    Activate(puuid, contractId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.post(this.Region.url.playerData + `/contracts/v1/contracts/${puuid}/special/${contractId}`);
        });
    }
}
exports.Contract = Contract;
