"use strict";
//import
Object.defineProperty(exports, "__esModule", { value: true });
exports.Match = void 0;
const tslib_1 = require("tslib");
//service
class Match {
    /**
     *
     * @param {ValRequestClient} ValRequestClient Request Client
     * @param {ValRegion.Json} Region Region Service Data
     */
    constructor(ValRequestClient, Region) {
        this.RequestClient = ValRequestClient;
        this.Region = Region;
    }
    //PVP Endpoints
    /**
     * Get contract definitions
     * @param {string} matchId Match ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    FetchMatchDetails(matchId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(`${this.Region.url.playerData}/match-details/v1/matches/${matchId}`);
        });
    }
    /**
     * @param {string} puuid Player UUID
     * @param {string} queueId Queue
     * @param {number} startIndex Start Index (default: 0)
     * @param {number} endIndex End Index (default: 10)
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    FetchMatchHistory(puuid, queueId, startIndex = 0, endIndex = 10) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let _url = `${this.Region.url.playerData}/match-history/v1/history/${puuid}?startIndex=${String(startIndex)}&endIndex=${String(endIndex)}`;
            if (queueId) {
                _url += `&queue=${queueId}`;
            }
            return yield this.RequestClient.get(_url);
        });
    }
}
exports.Match = Match;
