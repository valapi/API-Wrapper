"use strict";
//import
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentGame = void 0;
const tslib_1 = require("tslib");
//service
class CurrentGame {
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
     * @param {string} matchId Match ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    FetchAllChatMUCToken(matchId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(`${this.Region.url.partyService}/core-game/v1/matches/${matchId}/allchatmuctoken`);
        });
    }
    /**
     * @param {string} matchId Match ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    FetchMatch(matchId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(`${this.Region.url.partyService}/core-game/v1/matches/${matchId}`);
        });
    }
    /**
     * @param {string} matchId Match ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    FetchMatchLoadouts(matchId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(`${this.Region.url.partyService}/core-game/v1/matches/${matchId}/loadouts`);
        });
    }
    /**
     * @param {string} puuid PlayerUUID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    FetchPlayer(puuid) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(`${this.Region.url.partyService}/core-game/v1/players/${puuid}`);
        });
    }
    /**
     * @param {string} matchId Match ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    FetchTeamChatMUCToken(matchId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(`${this.Region.url.partyService}/core-game/v1/matches/${matchId}/teamchatmuctoken`);
        });
    }
    /**
     * * Careful to use, Riot will immediately shut down your Project.
     * @param {string} puuid Player UUID
     * @param {string} matchId Match ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    DisassociatePlayer(puuid, matchId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.post(`${this.Region.url.partyService}/core-game/v1/players/${puuid}/disassociate/${matchId}`);
        });
    }
}
exports.CurrentGame = CurrentGame;
