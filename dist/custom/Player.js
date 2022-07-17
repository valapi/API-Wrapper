"use strict";
//import
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const tslib_1 = require("tslib");
//service
class Player {
    /**
     * Class Constructor
     * @param {ValRequestClient} ValRequestClient Request Client
     * @param {ValorantApiRegion} Region Region Service Data
     * @param {string} UserAgent Request User Agent
     */
    constructor(ValRequestClient, Region, UserAgent) {
        this.RequestClient = ValRequestClient;
        this.Region = Region;
        this.UserAgent = UserAgent;
    }
    //Mike - Username From ID
    /**
     * @param {string} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    GetUsername(puuid) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.post(`https://auth.riotgames.com/userinfo`, {
                headers: {
                    'User-Agent': this.UserAgent,
                },
            });
        });
    }
    //PVP Endpoints
    /**
     * @param {string} puuid PlayerUUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    AccountXP(puuid) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(this.Region.url.playerData + `/account-xp/v1/players/${puuid}`);
        });
    }
    /**
     * @param {string} puuid PlayerUUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    Loadout(puuid) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(this.Region.url.playerData + `/personalization/v2/players/${puuid}/playerloadout`);
        });
    }
    /**
     * @param {string} puuid PlayerUUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    LoadoutUpdate(puuid) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.put(this.Region.url.playerData + `/personalization/v2/players/${puuid}/playerloadout`);
        });
    }
    /**
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    FetchPlayerRestrictions() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(this.Region.url.playerData + `/restrictions/v3/penalties`);
        });
    }
    // NOT IN DOCS //
    /**
     * @param {string} puuid PlayerUUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    MassRewards(puuid) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.post(this.Region.url.playerData + `/mass-rewards/v1/players/${puuid}/reconcile`);
        });
    }
}
exports.Player = Player;
