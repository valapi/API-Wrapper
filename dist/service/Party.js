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
exports.Party = void 0;
const lib_1 = require("@valapi/lib");
//service
class Party {
    /**
    * @param {AxiosClient} AxiosClient Services Data
    * @param {ValorantAPIRegion} Region Services Data
    */
    constructor(AxiosClient, Region) {
        this.AxiosClient = AxiosClient;
        this.Region = Region;
    }
    /**
     *
     * @param {String} puuid Player UUID
     * @returns {Promise<ValWrapperAxios<any>>}
     */
    RemovePlayer(puuid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.AxiosClient.delete(this.Region.url.partyService + `/parties/v1/players/${puuid}`);
        });
    }
    /**
     * @returns {Promise<ValWrapperAxios<any>>}
     */
    FetchCustomGameConfigs() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.AxiosClient.get(this.Region.url.partyService + `/parties/v1/parties/customgameconfigs`);
        });
    }
    /**
    * @param {String} partyId Party ID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    FetchMUCToken(partyId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.AxiosClient.get(this.Region.url.partyService + `/parties/v1/parties/${partyId}/muctoken`);
        });
    }
    /**
    * @param {String} partyId Party ID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    FetchParty(partyId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.AxiosClient.get(this.Region.url.partyService + `/parties/v1/parties/${partyId}`);
        });
    }
    /**
    * @param {String} puuid Player UUID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    FetchPlayer(puuid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.AxiosClient.get(this.Region.url.partyService + `/parties/v1/players/${puuid}`);
        });
    }
    /**
    * @param {String} partyId Party ID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    FetchVoiceToken(partyId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.AxiosClient.get(this.Region.url.partyService + `/parties/v1/parties/${partyId}/voicetoken`);
        });
    }
    /**
    * @param {String} partyId Party ID
    * @param {String} queue Queue (EligibleQueues)
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    ChangeQueue(partyId, queue) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.AxiosClient.post(this.Region.url.partyService + `/parties/v1/parties/${partyId}/queue`, {
                "queueID": `${lib_1.QueueId.data[queue]}`
            });
        });
    }
    /**
     * @param {String} partyId Party ID
     * @param {String} requestId Request ID
     * @returns {Promise<ValWrapperAxios<any>>}
     */
    DeclineRequest(partyId, requestId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.AxiosClient.post(this.Region.url.partyService + `/parties/v1/parties/${partyId}/request/${requestId}/decline`);
        });
    }
    /**
    * @param {String} partyId Party ID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    EnterMatchmakingQueue(partyId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.AxiosClient.post(this.Region.url.partyService + `/parties/v1/parties/${partyId}/matchmaking/join`);
        });
    }
    /**
    * @param {String} partyId Party ID
    * @param {String} gameName In-Game Name
    * @param {String} tagLine In-Game Tag
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    InviteToPartyByDisplayName(partyId, gameName, tagLine) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.AxiosClient.post(this.Region.url.partyService + `/parties/v1/parties/${partyId}/invites/name/${gameName}/tag/${tagLine}`);
        });
    }
    /**
    * @param {String} partyId Party ID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    LeaveMatchmakingQueue(partyId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.AxiosClient.post(this.Region.url.partyService + `/parties/v1/parties/${partyId}/matchmaking/leave`);
        });
    }
    /**
    * @param {String} puuid Player UUID
    * @param {String} partyId Party ID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    RefreshCompetitiveTier(puuid, partyId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.AxiosClient.post(this.Region.url.partyService + `/parties/v1/parties/${puuid}/members/${partyId}/refreshCompetitiveTier`);
        });
    }
    /**
    * @param {String} puuid Player UUID
    * @param {String} partyId Party ID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    RefreshPings(puuid, partyId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.AxiosClient.post(this.Region.url.partyService + `/parties/v1/parties/${puuid}/members/${partyId}/refreshPings`);
        });
    }
    /**
    * @param {String} puuid Player UUID
    * @param {String} partyId Party ID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    RefreshPlayerIdentity(puuid, partyId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.AxiosClient.post(this.Region.url.partyService + `/parties/v1/parties/${puuid}/members/${partyId}/refreshPlayerIdentity`);
        });
    }
    /**
    * @param {String} partyId Party ID
    * @param {String} accessibility Accessibility
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    SetAccessibility(partyId, accessibility) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.AxiosClient.post(this.Region.url.partyService + `/parties/v1/parties/${partyId}/accessibility`, {
                "accessibility": `${accessibility}`
            });
        });
    }
    /**
    * @param {String} partyId Party ID
    * @param {CustomGame_Settings} settings Custom Game Settings
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    SetCustomGameSettings(partyId, settings) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.AxiosClient.post(this.Region.url.partyService + `/parties/v1/parties/${partyId}/customgamesettings`, settings);
        });
    }
    /**
    * @param {String} puuid Player UUID
    * @param {String} partyId Party ID
    * @param {boolean} ready Ready or not?
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    SetMemberReady(puuid, partyId, ready) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.AxiosClient.post(this.Region.url.partyService + `/parties/v1/parties/${puuid}/members/${partyId}/setReady`, {
                "ready": ready
            });
        });
    }
    /**
    * @param {String} partyId Party ID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    StartCustomGame(partyId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.AxiosClient.post(this.Region.url.partyService + `/parties/v1/parties/${partyId}/startcustomgame`);
        });
    }
    // NOT IN DOCS //
    /**
    * @param {String} puuid Player UUID
    * @param {String} partyId Party ID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    LeaveParty(puuid, partyId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.AxiosClient.post(this.Region.url.partyService + `/parties/v1/players/${puuid}/leaveparty/${partyId}`);
        });
    }
    /**
    * @param {String} partyId Party ID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    AutoBalance(partyId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.AxiosClient.post(this.Region.url.partyService + `/parties/v1/parties/${partyId}/balance`);
        });
    }
    /**
    * @param {String} partyId Party ID
    * @param {String} team Team
    * @param {String} puuid Player UUID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    ChangeTeamInCustomGame(partyId, team, puuid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.AxiosClient.post(this.Region.url.partyService + `/parties/v1/parties/${partyId}/customgamemembership/${team}`, {
                "playerToPutOnTeam": String(puuid),
            });
        });
    }
    /**
     * * Careful to use, Riot will immediately shut down your Project.
    * @param {String} puuid Player UUID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    StartSoloExperience(puuid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.AxiosClient.post(this.Region.url.partyService + `/parties/v1/players/${puuid}/startsoloexperience`);
        });
    }
}
exports.Party = Party;
//# sourceMappingURL=Party.js.map