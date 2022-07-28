"use strict";
//import
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = void 0;
const tslib_1 = require("tslib");
//service
class Store {
    /**
     * Class Constructor
     * @param {ValRequestClient} ValRequestClient Request Client
     * @param {ValorantApiRegion} Region Region Service Data
     */
    constructor(ValRequestClient, Region) {
        this.RequestClient = ValRequestClient;
        this.Region = Region;
    }
    /**
     * @param {string} puuid Player UUID
     * @param {string} itemTypeId Item Type
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    GetEntitlements(puuid, itemTypeId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(`${this.Region.url.playerData}/store/v1/entitlements/${puuid}/${itemTypeId}`);
        });
    }
    /**
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    GetOffers() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(`${this.Region.url.playerData}/store/v1/offers/`);
        });
    }
    /**
     * @param {string} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    GetStorefront(puuid) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(`${this.Region.url.playerData}/store/v2/storefront/${puuid}`);
        });
    }
    /**
     * @param {string} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    GetWallet(puuid) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(`${this.Region.url.playerData}/store/v1/wallet/${puuid}`);
        });
    }
    // NOT IN DOCS //
    /**
     * * NOT TESTED
     * @param {string} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    RevealNightMarketOffers(puuid) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.post(`${this.Region.url.playerData}/store/v2/storefront/${puuid}/nightmarket/offers`);
        });
    }
}
exports.Store = Store;
