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
exports.MMR = void 0;
//service
class MMR {
    /**
     * Class Constructor
     * @param {AxiosClient} AxiosClient Services Data
     * @param {ValorantApiRegion} Region Services Data
     */
    constructor(AxiosClient, Region) {
        this.RequestClient = AxiosClient;
        this.Region = Region;
    }
    /**
     * @param {String} puuid Player UUID
     * @param {String} queueId Queue
     * @param {Number} startIndex Start Index (default: 0)
     * @param {Number} endIndex End Index (default: 10)
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    FetchCompetitiveUpdates(puuid, queueId, startIndex = 0, endIndex = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            let _url = this.Region.url.playerData + `/mmr/v1/players/${puuid}/competitiveupdates?startIndex=${String(startIndex)}&endIndex=${String(endIndex)}`;
            if (queueId) {
                _url += `&queue=${queueId}`;
            }
            return yield this.RequestClient.get(_url);
        });
    }
    /**
     * @param {String} seasonId Season ID
     * @param {Number} startIndex Start Index (default: 0)
     * @param {Number} size Size (default: 510)
     * @param {String} serachUsername Search Username
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    FetchLeaderboard(seasonId, startIndex = 0, size = 510, serachUsername) {
        return __awaiter(this, void 0, void 0, function* () {
            let _url = this.Region.url.playerData + `/mmr/v1/leaderboards/affinity/${this.Region.data.api}/queue/competitive/season/${seasonId}?startIndex=${startIndex}&size=${size}`;
            if (serachUsername) {
                _url += `&query=${serachUsername}`;
            }
            return yield this.RequestClient.get(_url);
        });
    }
    /**
     * @param {String} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    FetchPlayer(puuid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(this.Region.url.playerData + `/mmr/v1/players/${puuid}`);
        });
    }
    // NOT IN DOCS //
    /**
     * @param {String} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    HideActRankBadge(puuid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.post(this.Region.url.playerData + `/mmr/v1/players/${puuid}/hideactrankbadge`);
        });
    }
}
exports.MMR = MMR;
//# sourceMappingURL=MMR.js.map