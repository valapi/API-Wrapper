import { type ValRequestClient, type ValRegion, QueueId } from "@valapi/lib";
declare type PartySetAccessibility = 'OPEN' | 'CLOSED';
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
declare type CustomGameTeam = 'TeamTwo' | 'TeamOne' | 'TeamSpectate' | 'TeamOneCoaches' | 'TeamTwoCoaches';
declare class Party {
    private RequestClient;
    private Region;
    /**
     *
     * @param {ValRequestClient} ValRequestClient Request Client
     * @param {ValRegion.Json} Region Region Service Data
     */
    constructor(ValRequestClient: ValRequestClient, Region: ValRegion.Json);
    /**
     *
     * @param {string} puuid Player UUID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    RemovePlayer(puuid: string): Promise<ValRequestClient.Response<any>>;
    /**
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    FetchCustomGameConfigs(): Promise<ValRequestClient.Response<any>>;
    /**
     * @param {string} partyId Party ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    FetchMUCToken(partyId: string): Promise<ValRequestClient.Response<any>>;
    /**
     * @param {string} partyId Party ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    FetchParty(partyId: string): Promise<ValRequestClient.Response<any>>;
    /**
     * @param {string} puuid Player UUID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    FetchPlayer(puuid: string): Promise<ValRequestClient.Response<any>>;
    /**
     * @param {string} partyId Party ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    FetchVoiceToken(partyId: string): Promise<ValRequestClient.Response<any>>;
    /**
     * @param {string} partyId Party ID
     * @param {string} queueId Queue (EligibleQueues)
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    ChangeQueue(partyId: string, queueId: QueueId.String): Promise<ValRequestClient.Response<any>>;
    /**
     * @param {string} partyId Party ID
     * @param {string} requestId Request ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    DeclineRequest(partyId: string, requestId: string): Promise<ValRequestClient.Response<any>>;
    /**
     * @param {string} partyId Party ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    EnterMatchmakingQueue(partyId: string): Promise<ValRequestClient.Response<any>>;
    /**
     * @param {string} partyId Party ID
     * @param {string} gameName In-Game Name
     * @param {string} tagLine In-Game Tag
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    InviteToPartyByDisplayName(partyId: string, gameName: string, tagLine: string): Promise<ValRequestClient.Response<any>>;
    /**
     * * Careful to use, Riot will immediately shut down your Project.
     * @param {string} partyId Party ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    LeaveMatchmakingQueue(partyId: string): Promise<ValRequestClient.Response<any>>;
    /**
     * @param {string} puuid Player UUID
     * @param {string} partyId Party ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    RefreshCompetitiveTier(puuid: string, partyId: string): Promise<ValRequestClient.Response<any>>;
    /**
     * @param {string} puuid Player UUID
     * @param {string} partyId Party ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    RefreshPings(puuid: string, partyId: string): Promise<ValRequestClient.Response<any>>;
    /**
     * @param {string} puuid Player UUID
     * @param {string} partyId Party ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    RefreshPlayerIdentity(puuid: string, partyId: string): Promise<ValRequestClient.Response<any>>;
    /**
     * @param {string} partyId Party ID
     * @param {string} accessibility Accessibility
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    SetAccessibility(partyId: string, accessibility: PartySetAccessibility): Promise<ValRequestClient.Response<any>>;
    /**
     * @param {string} partyId Party ID
     * @param {CustomGameSettings} settings Custom Game Settings
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    SetCustomGameSettings(partyId: string, settings: CustomGameSettings): Promise<ValRequestClient.Response<any>>;
    /**
     * @param {string} puuid Player UUID
     * @param {string} partyId Party ID
     * @param {boolean} isReady Ready or not?
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    SetMemberReady(puuid: string, partyId: string, isReady: boolean): Promise<ValRequestClient.Response<any>>;
    /**
     * @param {string} partyId Party ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    StartCustomGame(partyId: string): Promise<ValRequestClient.Response<any>>;
    /**
     * @param {string} puuid Player UUID
     * @param {string} partyId Party ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    LeaveParty(puuid: string, partyId: string): Promise<ValRequestClient.Response<any>>;
    /**
     * @param {string} partyId Party ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    AutoBalance(partyId: string): Promise<ValRequestClient.Response<any>>;
    /**
     * @param {string} partyId Party ID
     * @param {string} team Team
     * @param {string} puuid Player UUID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    ChangeTeamInCustomGame(partyId: string, team: CustomGameTeam, puuid: string): Promise<ValRequestClient.Response<any>>;
    /**
     * * Careful to use, Riot will immediately shut down your Project.
     * @param {string} puuid Player UUID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    StartSoloExperience(puuid: string): Promise<ValRequestClient.Response<any>>;
    /**
     * @param {string} puuid Player UUID
     * @param {string} partyId Party ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    TransferOwner(puuid: string, partyId: string): Promise<ValRequestClient.Response<any>>;
}
export { Party };
export type { PartySetAccessibility, CustomGameSettings, CustomGameTeam };
