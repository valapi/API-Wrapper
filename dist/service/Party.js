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
//service
class Party {
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
     *
     * @param {String} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    RemovePlayer(puuid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.delete(this.Region.url.partyService + `/parties/v1/players/${puuid}`);
        });
    }
    /**
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    FetchCustomGameConfigs() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(this.Region.url.partyService + `/parties/v1/parties/customgameconfigs`);
        });
    }
    /**
     * @param {String} partyId Party ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    FetchMUCToken(partyId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(this.Region.url.partyService + `/parties/v1/parties/${partyId}/muctoken`);
        });
    }
    /**
     * @param {String} partyId Party ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    FetchParty(partyId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(this.Region.url.partyService + `/parties/v1/parties/${partyId}`);
        });
    }
    /**
     * @param {String} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    FetchPlayer(puuid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(this.Region.url.partyService + `/parties/v1/players/${puuid}`);
        });
    }
    /**
     * @param {String} partyId Party ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    FetchVoiceToken(partyId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(this.Region.url.partyService + `/parties/v1/parties/${partyId}/voicetoken`);
        });
    }
    /**
     * @param {String} partyId Party ID
     * @param {String} queueId Queue (EligibleQueues)
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    ChangeQueue(partyId, queueId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.post(this.Region.url.partyService + `/parties/v1/parties/${partyId}/queue`, {
                "queueID": String(queueId)
            });
        });
    }
    /**
     * @param {String} partyId Party ID
     * @param {String} requestId Request ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    DeclineRequest(partyId, requestId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.post(this.Region.url.partyService + `/parties/v1/parties/${partyId}/request/${requestId}/decline`);
        });
    }
    /**
     * @param {String} partyId Party ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    EnterMatchmakingQueue(partyId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.post(this.Region.url.partyService + `/parties/v1/parties/${partyId}/matchmaking/join`);
        });
    }
    /**
     * @param {String} partyId Party ID
     * @param {String} gameName In-Game Name
     * @param {String} tagLine In-Game Tag
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    InviteToPartyByDisplayName(partyId, gameName, tagLine) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.post(this.Region.url.partyService + `/parties/v1/parties/${partyId}/invites/name/${gameName}/tag/${tagLine}`);
        });
    }
    /**
     * @param {String} partyId Party ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    LeaveMatchmakingQueue(partyId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.post(this.Region.url.partyService + `/parties/v1/parties/${partyId}/matchmaking/leave`);
        });
    }
    /**
     * @param {String} puuid Player UUID
     * @param {String} partyId Party ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    RefreshCompetitiveTier(puuid, partyId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.post(this.Region.url.partyService + `/parties/v1/parties/${puuid}/members/${partyId}/refreshCompetitiveTier`);
        });
    }
    /**
     * @param {String} puuid Player UUID
     * @param {String} partyId Party ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    RefreshPings(puuid, partyId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.post(this.Region.url.partyService + `/parties/v1/parties/${puuid}/members/${partyId}/refreshPings`);
        });
    }
    /**
     * @param {String} puuid Player UUID
     * @param {String} partyId Party ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    RefreshPlayerIdentity(puuid, partyId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.post(this.Region.url.partyService + `/parties/v1/parties/${puuid}/members/${partyId}/refreshPlayerIdentity`);
        });
    }
    /**
     * @param {String} partyId Party ID
     * @param {String} accessibility Accessibility
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    SetAccessibility(partyId, accessibility) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.post(this.Region.url.partyService + `/parties/v1/parties/${partyId}/accessibility`, {
                "accessibility": `${accessibility}`
            });
        });
    }
    /**
     * @param {String} partyId Party ID
     * @param {CustomGame_Settings} settings Custom Game Settings
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    SetCustomGameSettings(partyId, settings) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.post(this.Region.url.partyService + `/parties/v1/parties/${partyId}/customgamesettings`, settings);
        });
    }
    /**
     * @param {String} puuid Player UUID
     * @param {String} partyId Party ID
     * @param {boolean} isReady Ready or not?
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    SetMemberReady(puuid, partyId, isReady) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.post(this.Region.url.partyService + `/parties/v1/parties/${puuid}/members/${partyId}/setReady`, {
                "ready": isReady
            });
        });
    }
    /**
     * @param {String} partyId Party ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    StartCustomGame(partyId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.post(this.Region.url.partyService + `/parties/v1/parties/${partyId}/startcustomgame`);
        });
    }
    // NOT IN DOCS //
    /**
     * @param {String} puuid Player UUID
     * @param {String} partyId Party ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    LeaveParty(puuid, partyId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.post(this.Region.url.partyService + `/parties/v1/players/${puuid}/leaveparty/${partyId}`);
        });
    }
    /**
     * @param {String} partyId Party ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    AutoBalance(partyId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.post(this.Region.url.partyService + `/parties/v1/parties/${partyId}/balance`);
        });
    }
    /**
     * @param {String} partyId Party ID
     * @param {String} team Team
     * @param {String} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    ChangeTeamInCustomGame(partyId, team, puuid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.post(this.Region.url.partyService + `/parties/v1/parties/${partyId}/customgamemembership/${team}`, {
                "playerToPutOnTeam": String(puuid),
            });
        });
    }
    /**
     * * Careful to use, Riot will immediately shut down your Project.
     * @param {String} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    StartSoloExperience(puuid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.post(this.Region.url.partyService + `/parties/v1/players/${puuid}/startsoloexperience`);
        });
    }
    /**
     * * Careful to use, Riot will immediately shut down your Project.
     * @param {String} puuid Player UUID
     * @param {String} partyId Party ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    TransferOwner(puuid, partyId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.post(this.Region.url.partyService + `/parties/v1/parties/${partyId}/members/${puuid}/owner`);
        });
    }
}
exports.Party = Party;
//# sourceMappingURL=Party.js.map