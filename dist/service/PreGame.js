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
exports.PreGame = void 0;
//service
class PreGame {
    /**
    * @param {AxiosClient} AxiosClient Services Data
    * @param {ValorantAPIRegion} Region Services Data
    */
    constructor(AxiosClient, Region) {
        this.AxiosClient = AxiosClient;
        this.Region = Region;
    }
    /**
     * Class Constructor
     * @param {String} matchId Match ID
     * @returns {Promise<ValWrapperAxios<any>>}
     */
    FetchChatToken(matchId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.AxiosClient.get(this.Region.url.partyService + `/pregame/v1/matches/${matchId}/chattoken`);
        });
    }
    /**
     * @param {String} matchId Match ID
     * @returns {Promise<ValWrapperAxios<any>>}
     */
    FetchVoiceToken(matchId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.AxiosClient.get(this.Region.url.partyService + `/pregame/v1/matches/${matchId}/voicetoken`);
        });
    }
    /**
     * @param {String} matchId Match ID
     * @returns {Promise<ValWrapperAxios<any>>}
     */
    GetMatch(matchId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.AxiosClient.get(this.Region.url.partyService + `/pregame/v1/matches/${matchId}`);
        });
    }
    /**
     * @param {String} matchId Match ID
     * @returns {Promise<ValWrapperAxios<any>>}
     */
    GetMatchLoadouts(matchId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.AxiosClient.get(this.Region.url.partyService + `/pregame/v1/matches/${matchId}/loadouts`);
        });
    }
    /**
     * @param {String} puuid Player UUID
     * @returns {Promise<ValWrapperAxios<any>>}
     */
    GetPlayer(puuid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.AxiosClient.get(this.Region.url.partyService + `/pregame/v1/players/${puuid}`);
        });
    }
    /**
     * @param {String} matchId Match ID
     * @param {String} agentId Character ID
     * @returns {Promise<ValWrapperAxios<any>>}
     */
    LockCharacter(matchId, agentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.AxiosClient.post(this.Region.url.partyService + `/pregame/v1/matches/${matchId}/lock/${agentId}`);
        });
    }
    /**
     * * Careful to use, Riot will immediately shut down your Project.
     * @param {String} matchId Match ID
     * @returns {Promise<ValWrapperAxios<any>>}
     */
    QuitMatch(matchId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.AxiosClient.post(this.Region.url.partyService + `/pregame/v1/matches/${matchId}/quit`);
        });
    }
    /**
     * @param {String} matchId Match ID
     * @param {String} agentId Character ID
     * @returns {Promise<ValWrapperAxios<any>>}
     */
    SelectCharacter(matchId, agentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.AxiosClient.post(this.Region.url.partyService + `/pregame/v1/matches/${matchId}/select/${agentId}`);
        });
    }
}
exports.PreGame = PreGame;
//# sourceMappingURL=PreGame.js.map