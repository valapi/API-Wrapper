"use strict";
//import
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreGame = void 0;
const tslib_1 = require("tslib");
//service
class PreGame {
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
    FetchChatToken(matchId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(`${this.Region.url.partyService}/pregame/v1/matches/${matchId}/chattoken`);
        });
    }
    /**
     * @param {string} matchId Match ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    FetchVoiceToken(matchId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(`${this.Region.url.partyService}/pregame/v1/matches/${matchId}/voicetoken`);
        });
    }
    /**
     * @param {string} matchId Match ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    GetMatch(matchId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(`${this.Region.url.partyService}/pregame/v1/matches/${matchId}`);
        });
    }
    /**
     * @param {string} matchId Match ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    GetMatchLoadouts(matchId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(`${this.Region.url.partyService}/pregame/v1/matches/${matchId}/loadouts`);
        });
    }
    /**
     * @param {string} puuid Player UUID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    GetPlayer(puuid) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(`${this.Region.url.partyService}/pregame/v1/players/${puuid}`);
        });
    }
    /**
     * * Careful to use, Riot will immediately shut down your Project.
     * @param {string} matchId Match ID
     * @param {string} agentId Character ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    LockCharacter(matchId, agentId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.post(`${this.Region.url.partyService}/pregame/v1/matches/${matchId}/lock/${agentId}`);
        });
    }
    /**
     * * Careful to use, Riot will immediately shut down your Project.
     * @param {string} matchId Match ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    QuitMatch(matchId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.post(`${this.Region.url.partyService}/pregame/v1/matches/${matchId}/quit`);
        });
    }
    /**
     * * Careful to use, Riot will immediately shut down your Project.
     * @param {string} matchId Match ID
     * @param {string} agentId Character ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    SelectCharacter(matchId, agentId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.post(`${this.Region.url.partyService}/pregame/v1/matches/${matchId}/select/${agentId}`);
        });
    }
}
exports.PreGame = PreGame;
