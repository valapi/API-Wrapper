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
exports.Store = void 0;
const lib_1 = require("@valapi/lib");
//service
class Store {
    /**
    * @param {AxiosClient} AxiosClient Services Data
    * @param {ValorantAPIRegion} Region Services Data
    */
    constructor(AxiosClient, Region) {
        this.AxiosClient = AxiosClient;
        this.Region = Region;
    }
    /**
    * @param {String} puuid Player UUID
    * @param {String} itemType Item Type
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    GetEntitlements(puuid, itemType) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.AxiosClient.get(this.Region.url.playerData + `/store/v1/entitlements/${puuid}/${lib_1.ItemTypeId.data[itemType]}`);
        });
    }
    /**
     * @returns {Promise<ValWrapperAxios<any>>}
    */
    GetOffers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.AxiosClient.get(this.Region.url.playerData + `/store/v1/offers/`);
        });
    }
    /**
    * @param {String} puuid Player UUID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    GetStorefront(puuid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.AxiosClient.get(this.Region.url.playerData + `/store/v2/storefront/${puuid}`);
        });
    }
    /**
    * @param {String} puuid Player UUID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    GetWallet(puuid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.AxiosClient.get(this.Region.url.playerData + `/store/v1/wallet/${puuid}`);
        });
    }
    // NOT IN DOCS //
    /**
     * * NOT TESTED
    * @param {String} puuid Player UUID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    RevealNightMarketOffers(puuid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.AxiosClient.post(this.Region.url.playerData + `/store/v2/storefront/${puuid}/nightmarket/offers`);
        });
    }
}
exports.Store = Store;
//# sourceMappingURL=Store.js.map