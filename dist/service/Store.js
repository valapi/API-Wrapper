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
exports.Store = void 0;
//import
const AxiosClient_1 = require("../client/AxiosClient");
const ItemTypeId_1 = __importDefault(require("../resources/ItemTypeId"));
//service
class Store {
    /**
    * @param {ValWrapperService} data Services Data
    */
    constructor(data) {
        this.AxiosClient = new AxiosClient_1.AxiosClient(data.AxiosData);
        this.Region = data.Region;
    }
    /**
    * @param {String} puuid Player UUID
    * @param {String} itemType Item Type
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    GetEntitlements(puuid, itemType) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.AxiosClient.get(this.Region.url.playerData + `/store/v1/entitlements/${puuid}/${ItemTypeId_1.default.data[itemType]}`);
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
}
exports.Store = Store;
//# sourceMappingURL=Store.js.map