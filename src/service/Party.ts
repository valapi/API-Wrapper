//import

import { type ValRequestClient, type ValRegion, QueueId } from "@valapi/lib";

//interface

type PartySetAccessibility = 'OPEN' | 'CLOSED';

interface CustomGameSettings {
    "Map": string;
    "Mode": string;
    "UseBots": boolean;
    "GamePod": string;
    "GameRules": {
        "AllowGameModifiers": boolean;
        "PlayOutAllRounds": boolean;
        "SkipMatchHistory": boolean;
        "TournamentMode": boolean;
        "IsOvertimeWinByTwo": boolean;
    };
}

type CustomGameTeam = 'TeamTwo' | 'TeamOne' | 'TeamSpectate' | 'TeamOneCoaches' | 'TeamTwoCoaches';

//service

class Party {
    private RequestClient: ValRequestClient;
    private Region: ValRegion.Json;

    /**
     * 
     * @param {ValRequestClient} ValRequestClient Request Client
     * @param {ValRegion.Json} Region Region Service Data
     */
    public constructor(ValRequestClient: ValRequestClient, Region: ValRegion.Json) {
        this.RequestClient = ValRequestClient;
        this.Region = Region;
    }

    /**
     * 
     * @param {string} puuid Player UUID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async RemovePlayer(puuid: string): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.delete(`${this.Region.url.partyService}/parties/v1/players/${puuid}`);
    }

    /**
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async FetchCustomGameConfigs(): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.get(`${this.Region.url.partyService}/parties/v1/parties/customgameconfigs`);
    }

    /**
     * @param {string} partyId Party ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async FetchMUCToken(partyId: string): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.get(`${this.Region.url.partyService}/parties/v1/parties/${partyId}/muctoken`);
    }

    /**
     * @param {string} partyId Party ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async FetchParty(partyId: string): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.get(`${this.Region.url.partyService}/parties/v1/parties/${partyId}`);
    }

    /**
     * @param {string} puuid Player UUID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async FetchPlayer(puuid: string): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.get(`${this.Region.url.partyService}/parties/v1/players/${puuid}`);
    }

    /**
     * @param {string} partyId Party ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async FetchVoiceToken(partyId: string): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.get(`${this.Region.url.partyService}/parties/v1/parties/${partyId}/voicetoken`);
    }

    /**
     * @param {string} partyId Party ID
     * @param {string} queueId Queue (EligibleQueues)
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async ChangeQueue(partyId: string, queueId: QueueId.String): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.post(`${this.Region.url.partyService}/parties/v1/parties/${partyId}/queue`, {
            "queueID": String(queueId)
        });
    }

    /**
     * @param {string} partyId Party ID
     * @param {string} requestId Request ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async DeclineRequest(partyId: string, requestId: string): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.post(`${this.Region.url.partyService}/parties/v1/parties/${partyId}/request/${requestId}/decline`);
    }

    /**
     * @param {string} partyId Party ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async EnterMatchmakingQueue(partyId: string): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.post(`${this.Region.url.partyService}/parties/v1/parties/${partyId}/matchmaking/join`);
    }

    /**
     * @param {string} partyId Party ID
     * @param {string} gameName In-Game Name
     * @param {string} tagLine In-Game Tag
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async InviteToPartyByDisplayName(partyId: string, gameName: string, tagLine: string): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.post(`${this.Region.url.partyService}/parties/v1/parties/${partyId}/invites/name/${gameName}/tag/${tagLine}`);
    }

    /**
     * * Careful to use, Riot will immediately shut down your Project.
     * @param {string} partyId Party ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async LeaveMatchmakingQueue(partyId: string): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.post(`${this.Region.url.partyService}/parties/v1/parties/${partyId}/matchmaking/leave`);
    }

    /**
     * @param {string} puuid Player UUID
     * @param {string} partyId Party ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async RefreshCompetitiveTier(puuid: string, partyId: string): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.post(`${this.Region.url.partyService}/parties/v1/parties/${puuid}/members/${partyId}/refreshCompetitiveTier`);
    }

    /**
     * @param {string} puuid Player UUID
     * @param {string} partyId Party ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async RefreshPings(puuid: string, partyId: string): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.post(`${this.Region.url.partyService}/parties/v1/parties/${puuid}/members/${partyId}/refreshPings`);
    }

    /**
     * @param {string} puuid Player UUID
     * @param {string} partyId Party ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async RefreshPlayerIdentity(puuid: string, partyId: string): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.post(`${this.Region.url.partyService}/parties/v1/parties/${puuid}/members/${partyId}/refreshPlayerIdentity`);
    }

    /**
     * @param {string} partyId Party ID
     * @param {string} accessibility Accessibility
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async SetAccessibility(partyId: string, accessibility: PartySetAccessibility): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.post(`${this.Region.url.partyService}/parties/v1/parties/${partyId}/accessibility`, {
            "accessibility": `${accessibility}`
        });
    }

    /**
     * @param {string} partyId Party ID
     * @param {CustomGameSettings} settings Custom Game Settings
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async SetCustomGameSettings(partyId: string, settings: CustomGameSettings): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.post(`${this.Region.url.partyService}/parties/v1/parties/${partyId}/customgamesettings`, settings);
    }

    /**
     * @param {string} puuid Player UUID
     * @param {string} partyId Party ID
     * @param {boolean} isReady Ready or not?
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async SetMemberReady(puuid: string, partyId: string, isReady: boolean): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.post(`${this.Region.url.partyService}/parties/v1/parties/${puuid}/members/${partyId}/setReady`, {
            "ready": isReady
        });
    }

    /**
     * @param {string} partyId Party ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async StartCustomGame(partyId: string): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.post(`${this.Region.url.partyService}/parties/v1/parties/${partyId}/startcustomgame`);
    }

    // NOT IN DOCS //

    /**
     * @param {string} puuid Player UUID
     * @param {string} partyId Party ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async LeaveParty(puuid: string, partyId: string): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.post(`${this.Region.url.partyService}/parties/v1/players/${puuid}/leaveparty/${partyId}`);
    }

    /**
     * @param {string} partyId Party ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async AutoBalance(partyId: string): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.post(`${this.Region.url.partyService}/parties/v1/parties/${partyId}/balance`);
    }

    /**
     * @param {string} partyId Party ID
     * @param {string} team Team
     * @param {string} puuid Player UUID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async ChangeTeamInCustomGame(partyId: string, team: CustomGameTeam, puuid: string): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.post(`${this.Region.url.partyService}/parties/v1/parties/${partyId}/customgamemembership/${team}`, {
            "playerToPutOnTeam": String(puuid),
        });
    }

    /**
     * * Careful to use, Riot will immediately shut down your Project.
     * @param {string} puuid Player UUID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async StartSoloExperience(puuid: string): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.post(`${this.Region.url.partyService}/parties/v1/players/${puuid}/startsoloexperience`);
    }

    /**
     * @param {string} puuid Player UUID
     * @param {string} partyId Party ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async TransferOwner(puuid: string, partyId: string): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.post(`${this.Region.url.partyService}/parties/v1/parties/${partyId}/members/${puuid}/owner`);
    }
}

//export

export { Party };
export type { PartySetAccessibility, CustomGameSettings, CustomGameTeam };