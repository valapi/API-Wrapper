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
exports.Contract = void 0;
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
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(this.Region.url.playerData + `/contract-definitions/v3/item-upgrades`);
        });
    }
    /**
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    FetchActiveStory() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(this.Region.url.playerData + `/contract-definitions/v2/definitions/story`);
        });
    }
    /**
     * @param {String} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    Fetch(puuid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(this.Region.url.playerData + `/contracts/v1/contracts/${puuid}`);
        });
    }
    /**
     * @param {String} puuid Player UUID
     * @param {String} contractId Contract ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    Activate(puuid, contractId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.post(this.Region.url.playerData + `/contracts/v1/contracts/${puuid}/special/${contractId}`);
        });
    }
}
exports.Contract = Contract;
//# sourceMappingURL=Contract.js.map