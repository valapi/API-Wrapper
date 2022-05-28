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
exports.Player = void 0;
//service
class Player {
    /**
     * Class Constructor
     * @param {AxiosClient} AxiosClient Services Data
     * @param {ValorantApiRegion} Region Services Data
     */
    constructor(AxiosClient, Region, UserAgent) {
        this.RequestClient = AxiosClient;
        this.Region = Region;
        this.UserAgent = UserAgent;
    }
    //Mike - Username From ID
    /**
     * @param {String} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    GetUsername(puuid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.put(this.Region.url.playerData + `/name-service/v2/players`, [
                `${puuid}`
            ]);
        });
    }
    //Riot Auth
    /**
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    GetUserInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.post(`https://auth.riotgames.com/userinfo`, {
                headers: {
                    'User-Agent': this.UserAgent,
                },
            });
        });
    }
    //PVP Endpoints
    /**
     * @param {String} puuid PlayerUUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    AccountXP(puuid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(this.Region.url.playerData + `/account-xp/v1/players/${puuid}`);
        });
    }
    /**
     * @param {String} puuid PlayerUUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    Loadout(puuid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(this.Region.url.playerData + `/personalization/v2/players/${puuid}/playerloadout`);
        });
    }
    /**
     * @param {String} puuid PlayerUUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    LoadoutUpdate(puuid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.put(this.Region.url.playerData + `/personalization/v2/players/${puuid}/playerloadout`);
        });
    }
    /**
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    FetchPlayerRestrictions() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(this.Region.url.playerData + `/restrictions/v3/penalties`);
        });
    }
    // NOT IN DOCS //
    /**
     * * IDK what this is
     * @param {String} puuid PlayerUUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    MassRewards(puuid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.post(this.Region.url.playerData + `/mass-rewards/v1/players/${puuid}/reconcile`);
        });
    }
}
exports.Player = Player;
//# sourceMappingURL=Player.js.map