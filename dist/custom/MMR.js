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
const lib_1 = require("@valapi/lib");
//service
class MMR {
    /**
    * @param {AxiosClient} AxiosClient Services Data
    * @param {ValorantAPIRegion} Region Services Data
    */
    constructor(AxiosClient, Region) {
        this.AxiosClient = AxiosClient;
        this.Region = Region;
    }
    /**
    * @param {String} puuid Player UUID
    * @param {String} queue Queue
    * @param {Number} startIndex Start Index
    * @param {Number} endIndex End Index
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    FetchCompetitiveUpdates(puuid, queue, startIndex = 0, endIndex = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            let _url = this.Region.url.playerData + `/mmr/v1/players/${puuid}/competitiveupdates?startIndex=${String(startIndex)}&endIndex=${String(endIndex)}`;
            if (queue) {
                _url += `&queue=${lib_1.QueueId.data[queue]}`;
            }
            return yield this.AxiosClient.get(_url);
        });
    }
    /**
    * @param {String} seasonId Season ID
    * @param {Number} startIndex Start Index
    * @param {Number} size Size
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    FetchLeaderboard(seasonId, startIndex = 0, size = 510) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.AxiosClient.get(this.Region.url.playerData + `/mmr/v1/leaderboards/affinity/na/queue/competitive/season/${seasonId}?startIndex=${startIndex}&size=${size}`);
        });
    }
    /**
    * @param {String} puuid Player UUID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    FetchPlayer(puuid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.AxiosClient.get(this.Region.url.playerData + `/mmr/v1/players/${puuid}`);
        });
    }
}
exports.MMR = MMR;
//# sourceMappingURL=MMR.js.map