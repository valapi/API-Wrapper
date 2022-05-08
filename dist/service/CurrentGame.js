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
exports.CurrentGame = void 0;
//service
class CurrentGame {
    /**
    * @param {AxiosClient} AxiosClient Services Data
    * @param {ValorantAPIRegion} Region Services Data
    */
    constructor(AxiosClient, Region) {
        this.AxiosClient = AxiosClient;
        this.Region = Region;
    }
    /**
    * @param {String} matchId Match ID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    FetchMatch(matchId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.AxiosClient.get(this.Region.url.partyService + `/core-game/v1/matches/${matchId}`);
        });
    }
    /**
    * @param {String} matchId Match ID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    FetchMatchLoadouts(matchId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.AxiosClient.get(this.Region.url.partyService + `/core-game/v1/matches/${matchId}/loadouts`);
        });
    }
    /**
    * @param {String} puuid PlayerUUID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    FetchPlayer(puuid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.AxiosClient.get(this.Region.url.partyService + `/core-game/v1/players/${puuid}`);
        });
    }
    /**
    * * Careful to use, Riot will immediately shut down your Project.
    * @param {String} puuid Player UUID
    * @param {String} matchId Match ID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    DisassociatePlayer(puuid, matchId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.AxiosClient.post(this.Region.url.partyService + `/core-game/v1/players/${puuid}/disassociate/${matchId}`);
        });
    }
}
exports.CurrentGame = CurrentGame;
//# sourceMappingURL=CurrentGame.js.map