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
//service
class Client {
    /**
     * Class Constructor
     * @param {AxiosClient} AxiosClient Services Data
     * @param {ValorantApiRegion} Region Services Data
     */
    constructor(AxiosClient, Region) {
        this.RequestClient = AxiosClient;
        this.Region = Region;
    }
    //PVP Endpoints
    /**
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    FetchContent() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(this.Region.url.sharedData + `/content-service/v3/content`);
        });
    }
    /**
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    FetchConfig() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(this.Region.url.sharedData + `/v1/config/${this.Region.data.api}`);
        });
    }
}
exports.Client = Client;
//# sourceMappingURL=Client.js.map