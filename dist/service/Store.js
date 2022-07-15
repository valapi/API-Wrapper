"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = void 0;
const tslib_1 = require("tslib");
//service
class Store {
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
     * @param {String} puuid Player UUID
     * @param {String} itemTypeId Item Type
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    GetEntitlements(puuid, itemTypeId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(this.Region.url.playerData + `/store/v1/entitlements/${puuid}/${itemTypeId}`);
        });
    }
    /**
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    GetOffers() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(this.Region.url.playerData + `/store/v1/offers/`);
        });
    }
    /**
     * @param {String} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    GetStorefront(puuid) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(this.Region.url.playerData + `/store/v2/storefront/${puuid}`);
        });
    }
    /**
     * @param {String} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    GetWallet(puuid) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(this.Region.url.playerData + `/store/v1/wallet/${puuid}`);
        });
    }
    // NOT IN DOCS //
    /**
     * * NOT TESTED
     * @param {String} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    RevealNightMarketOffers(puuid) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.post(this.Region.url.playerData + `/store/v2/storefront/${puuid}/nightmarket/offers`);
        });
    }
}
exports.Store = Store;
