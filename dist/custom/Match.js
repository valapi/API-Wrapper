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
exports.Match = void 0;
//service
class Match {
    /**
     * Class Constructor
     * @param {AxiosClient} AxiosClient Services Data
     * @param {ValorantAPIRegion} Region Services Data
     */
    constructor(AxiosClient, Region) {
        this.AxiosClient = AxiosClient;
        this.Region = Region;
    }
    //PVP Endpoints
    /**
     * Get contract definitions
     * @param {String} matchId Match ID
     * @returns {Promise<ValWrapperAxios<any>>}
     */
    FetchMatchDetails(matchId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.AxiosClient.get(this.Region.url.playerData + `/match-details/v1/matches/${matchId}`);
        });
    }
    /**
     * @param {String} puuid Player UUID
     * @param {String} queueId Queue
     * @param {Number} startIndex Start Index
     * @param {Number} endIndex End Index
     * @returns {Promise<ValWrapperAxios<any>>}
     */
    FetchMatchHistory(puuid, queueId, startIndex = 0, endIndex = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            let _url = this.Region.url.playerData + `/match-history/v1/history/${puuid}?startIndex=${String(startIndex)}&endIndex=${String(endIndex)}`;
            if (queueId === 'data') {
                this.AxiosClient.emit('error', {
                    errorCode: 'ValWrapper_Request_Error',
                    message: 'Queue ID cannot be "data"',
                    data: queueId,
                });
            }
            if (queueId) {
                _url += `&queue=${queueId}`;
            }
            return yield this.AxiosClient.get(_url);
        });
    }
}
exports.Match = Match;
//# sourceMappingURL=Match.js.map