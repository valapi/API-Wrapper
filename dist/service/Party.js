"use strict";
//import
Object.defineProperty(exports, "__esModule", { value: true });
exports.Party = void 0;
const tslib_1 = require("tslib");
//service
class Party {
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
     *
     * @param {string} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    RemovePlayer(puuid) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.delete(`${this.Region.url.partyService}/parties/v1/players/${puuid}`);
        });
    }
    /**
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    FetchCustomGameConfigs() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(`${this.Region.url.partyService}/parties/v1/parties/customgameconfigs`);
        });
    }
    /**
     * @param {string} partyId Party ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    FetchMUCToken(partyId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(`${this.Region.url.partyService}/parties/v1/parties/${partyId}/muctoken`);
        });
    }
    /**
     * @param {string} partyId Party ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    FetchParty(partyId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(`${this.Region.url.partyService}/parties/v1/parties/${partyId}`);
        });
    }
    /**
     * @param {string} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    FetchPlayer(puuid) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(`${this.Region.url.partyService}/parties/v1/players/${puuid}`);
        });
    }
    /**
     * @param {string} partyId Party ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    FetchVoiceToken(partyId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(`${this.Region.url.partyService}/parties/v1/parties/${partyId}/voicetoken`);
        });
    }
    /**
     * @param {string} partyId Party ID
     * @param {string} queueId Queue (EligibleQueues)
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    ChangeQueue(partyId, queueId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.post(`${this.Region.url.partyService}/parties/v1/parties/${partyId}/queue`, {
                "queueID": String(queueId)
            });
        });
    }
    /**
     * @param {string} partyId Party ID
     * @param {string} requestId Request ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    DeclineRequest(partyId, requestId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.post(`${this.Region.url.partyService}/parties/v1/parties/${partyId}/request/${requestId}/decline`);
        });
    }
    /**
     * @param {string} partyId Party ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    EnterMatchmakingQueue(partyId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.post(`${this.Region.url.partyService}/parties/v1/parties/${partyId}/matchmaking/join`);
        });
    }
    /**
     * @param {string} partyId Party ID
     * @param {string} gameName In-Game Name
     * @param {string} tagLine In-Game Tag
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    InviteToPartyByDisplayName(partyId, gameName, tagLine) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.post(`${this.Region.url.partyService}/parties/v1/parties/${partyId}/invites/name/${gameName}/tag/${tagLine}`);
        });
    }
    /**
     * * Careful to use, Riot will immediately shut down your Project.
     * @param {string} partyId Party ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    LeaveMatchmakingQueue(partyId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.post(`${this.Region.url.partyService}/parties/v1/parties/${partyId}/matchmaking/leave`);
        });
    }
    /**
     * @param {string} puuid Player UUID
     * @param {string} partyId Party ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    RefreshCompetitiveTier(puuid, partyId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.post(`${this.Region.url.partyService}/parties/v1/parties/${puuid}/members/${partyId}/refreshCompetitiveTier`);
        });
    }
    /**
     * @param {string} puuid Player UUID
     * @param {string} partyId Party ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    RefreshPings(puuid, partyId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.post(`${this.Region.url.partyService}/parties/v1/parties/${puuid}/members/${partyId}/refreshPings`);
        });
    }
    /**
     * @param {string} puuid Player UUID
     * @param {string} partyId Party ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    RefreshPlayerIdentity(puuid, partyId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.post(`${this.Region.url.partyService}/parties/v1/parties/${puuid}/members/${partyId}/refreshPlayerIdentity`);
        });
    }
    /**
     * @param {string} partyId Party ID
     * @param {string} accessibility Accessibility
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    SetAccessibility(partyId, accessibility) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.post(`${this.Region.url.partyService}/parties/v1/parties/${partyId}/accessibility`, {
                "accessibility": `${accessibility}`
            });
        });
    }
    /**
     * @param {string} partyId Party ID
     * @param {CustomGameSettings} settings Custom Game Settings
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    SetCustomGameSettings(partyId, settings) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.post(`${this.Region.url.partyService}/parties/v1/parties/${partyId}/customgamesettings`, settings);
        });
    }
    /**
     * @param {string} puuid Player UUID
     * @param {string} partyId Party ID
     * @param {boolean} isReady Ready or not?
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    SetMemberReady(puuid, partyId, isReady) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.post(`${this.Region.url.partyService}/parties/v1/parties/${puuid}/members/${partyId}/setReady`, {
                "ready": isReady
            });
        });
    }
    /**
     * @param {string} partyId Party ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    StartCustomGame(partyId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.post(`${this.Region.url.partyService}/parties/v1/parties/${partyId}/startcustomgame`);
        });
    }
    // NOT IN DOCS //
    /**
     * @param {string} puuid Player UUID
     * @param {string} partyId Party ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    LeaveParty(puuid, partyId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.post(`${this.Region.url.partyService}/parties/v1/players/${puuid}/leaveparty/${partyId}`);
        });
    }
    /**
     * @param {string} partyId Party ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    AutoBalance(partyId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.post(`${this.Region.url.partyService}/parties/v1/parties/${partyId}/balance`);
        });
    }
    /**
     * @param {string} partyId Party ID
     * @param {string} team Team
     * @param {string} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    ChangeTeamInCustomGame(partyId, team, puuid) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.post(`${this.Region.url.partyService}/parties/v1/parties/${partyId}/customgamemembership/${team}`, {
                "playerToPutOnTeam": String(puuid),
            });
        });
    }
    /**
     * * Careful to use, Riot will immediately shut down your Project.
     * @param {string} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    StartSoloExperience(puuid) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.post(`${this.Region.url.partyService}/parties/v1/players/${puuid}/startsoloexperience`);
        });
    }
    /**
     * @param {string} puuid Player UUID
     * @param {string} partyId Party ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    TransferOwner(puuid, partyId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.post(`${this.Region.url.partyService}/parties/v1/parties/${partyId}/members/${puuid}/owner`);
        });
    }
}
exports.Party = Party;
