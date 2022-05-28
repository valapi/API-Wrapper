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
     * Class Constructor
     * @param {ValRequestClient} ValRequestClient Services Data
     * @param {ValorantApiRegion} Region Services Data
     */
    constructor(ValRequestClient, Region) {
        this.RequestClient = ValRequestClient;
        this.Region = Region;
    }
    /**
     * @param {String} matchId Match ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    FetchAllChatMUCToken(matchId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(this.Region.url.partyService + `/core-game/v1/matches/${matchId}/allchatmuctoken`);
        });
    }
    /**
     * @param {String} matchId Match ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    FetchMatch(matchId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(this.Region.url.partyService + `/core-game/v1/matches/${matchId}`);
        });
    }
    /**
     * @param {String} matchId Match ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    FetchMatchLoadouts(matchId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(this.Region.url.partyService + `/core-game/v1/matches/${matchId}/loadouts`);
        });
    }
    /**
     * @param {String} puuid PlayerUUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    FetchPlayer(puuid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(this.Region.url.partyService + `/core-game/v1/players/${puuid}`);
        });
    }
    /**
     * @param {String} matchId Match ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    FetchTeamChatMUCToken(matchId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(this.Region.url.partyService + `/core-game/v1/matches/${matchId}/teamchatmuctoken`);
        });
    }
    /**
     * * Careful to use, Riot will immediately shut down your Project.
     * @param {String} puuid Player UUID
     * @param {String} matchId Match ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    DisassociatePlayer(puuid, matchId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.post(this.Region.url.partyService + `/core-game/v1/players/${puuid}/disassociate/${matchId}`);
        });
    }
}
exports.CurrentGame = CurrentGame;
//# sourceMappingURL=CurrentGame.js.map