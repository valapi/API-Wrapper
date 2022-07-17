"use strict";
//import
Object.defineProperty(exports, "__esModule", { value: true });
exports.MMR = void 0;
const tslib_1 = require("tslib");
//service
class MMR {
    /**
     * Class Constructor
     * @param {ValRequestClient} ValRequestClient Request Client
     * @param {ValorantApiRegion} Region Region Service Data
     */
    constructor(ValRequestClient, Region) {
        this.RequestClient = ValRequestClient;
        this.Region = Region;
    }
    /**
     * @param {string} puuid Player UUID
     * @param {string} queueId Queue
     * @param {number} startIndex Start Index (default: 0)
     * @param {number} endIndex End Index (default: 10)
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    FetchCompetitiveUpdates(puuid, queueId, startIndex = 0, endIndex = 10) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let _url = this.Region.url.playerData + `/mmr/v1/players/${puuid}/competitiveupdates?startIndex=${String(startIndex)}&endIndex=${String(endIndex)}`;
            if (queueId) {
                _url += `&queue=${queueId}`;
            }
            return yield this.RequestClient.get(_url);
        });
    }
    /**
     * @param {string} seasonId Season ID
     * @param {number} startIndex Start Index (default: 0)
     * @param {number} size Size (default: 510)
     * @param {string} serachUsername Search Username
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    FetchLeaderboard(seasonId, startIndex = 0, size = 510, serachUsername) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let _url = this.Region.url.playerData + `/mmr/v1/leaderboards/affinity/${this.Region.data.api}/queue/competitive/season/${seasonId}?startIndex=${startIndex}&size=${size}`;
            if (serachUsername) {
                _url += `&query=${serachUsername}`;
            }
            return yield this.RequestClient.get(_url);
        });
    }
    /**
     * @param {string} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    FetchPlayer(puuid) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(this.Region.url.playerData + `/mmr/v1/players/${puuid}`);
        });
    }
    // NOT IN DOCS //
    /**
     * @param {string} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    HideActRankBadge(puuid) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.post(this.Region.url.playerData + `/mmr/v1/players/${puuid}/hideactrankbadge`);
        });
    }
}
exports.MMR = MMR;
