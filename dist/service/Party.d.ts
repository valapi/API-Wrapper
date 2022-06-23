import type { ValRequestClient, ValorantApiRequestResponse } from "@valapi/lib";
import type { ValorantApiRegion } from "@valapi/lib";
import { QueueId } from "@valapi/lib";
declare type ValWrapperSetAccessibility = 'OPEN' | 'CLOSED';
interface ValWrapperCustomGameSettings {
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
declare type ValWrapperCustomGameTeam = 'TeamTwo' | 'TeamOne' | 'TeamSpectate' | 'TeamOneCoaches' | 'TeamTwoCoaches';
declare class Party {
    protected RequestClient: ValRequestClient;
    protected Region: ValorantApiRegion;
    /**
     * Class Constructor
     * @param {ValRequestClient} ValRequestClient Services Data
     * @param {ValorantApiRegion} Region Services Data
     */
    constructor(ValRequestClient: ValRequestClient, Region: ValorantApiRegion);
    /**
     *
     * @param {String} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    RemovePlayer(puuid: string): Promise<ValorantApiRequestResponse<any>>;
    /**
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    FetchCustomGameConfigs(): Promise<ValorantApiRequestResponse<any>>;
    /**
     * @param {String} partyId Party ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    FetchMUCToken(partyId: string): Promise<ValorantApiRequestResponse<any>>;
    /**
     * @param {String} partyId Party ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    FetchParty(partyId: string): Promise<ValorantApiRequestResponse<any>>;
    /**
     * @param {String} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    FetchPlayer(puuid: string): Promise<ValorantApiRequestResponse<any>>;
    /**
     * @param {String} partyId Party ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    FetchVoiceToken(partyId: string): Promise<ValorantApiRequestResponse<any>>;
    /**
     * @param {String} partyId Party ID
     * @param {String} queueId Queue (EligibleQueues)
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    ChangeQueue(partyId: string, queueId: keyof typeof QueueId.from): Promise<ValorantApiRequestResponse<any>>;
    /**
     * @param {String} partyId Party ID
     * @param {String} requestId Request ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    DeclineRequest(partyId: string, requestId: string): Promise<ValorantApiRequestResponse<any>>;
    /**
     * @param {String} partyId Party ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    EnterMatchmakingQueue(partyId: string): Promise<ValorantApiRequestResponse<any>>;
    /**
     * @param {String} partyId Party ID
     * @param {String} gameName In-Game Name
     * @param {String} tagLine In-Game Tag
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    InviteToPartyByDisplayName(partyId: string, gameName: string, tagLine: string): Promise<ValorantApiRequestResponse<any>>;
    /**
     * @param {String} partyId Party ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    LeaveMatchmakingQueue(partyId: string): Promise<ValorantApiRequestResponse<any>>;
    /**
     * @param {String} puuid Player UUID
     * @param {String} partyId Party ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    RefreshCompetitiveTier(puuid: string, partyId: string): Promise<ValorantApiRequestResponse<any>>;
    /**
     * @param {String} puuid Player UUID
     * @param {String} partyId Party ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    RefreshPings(puuid: string, partyId: string): Promise<ValorantApiRequestResponse<any>>;
    /**
     * @param {String} puuid Player UUID
     * @param {String} partyId Party ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    RefreshPlayerIdentity(puuid: string, partyId: string): Promise<ValorantApiRequestResponse<any>>;
    /**
     * @param {String} partyId Party ID
     * @param {String} accessibility Accessibility
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    SetAccessibility(partyId: string, accessibility: ValWrapperSetAccessibility): Promise<ValorantApiRequestResponse<any>>;
    /**
     * @param {String} partyId Party ID
     * @param {CustomGame_Settings} settings Custom Game Settings
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    SetCustomGameSettings(partyId: string, settings: ValWrapperCustomGameSettings): Promise<ValorantApiRequestResponse<any>>;
    /**
     * @param {String} puuid Player UUID
     * @param {String} partyId Party ID
     * @param {boolean} isReady Ready or not?
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    SetMemberReady(puuid: string, partyId: string, isReady: boolean): Promise<ValorantApiRequestResponse<any>>;
    /**
     * @param {String} partyId Party ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    StartCustomGame(partyId: string): Promise<ValorantApiRequestResponse<any>>;
    /**
     * @param {String} puuid Player UUID
     * @param {String} partyId Party ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    LeaveParty(puuid: string, partyId: string): Promise<ValorantApiRequestResponse<any>>;
    /**
     * @param {String} partyId Party ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    AutoBalance(partyId: string): Promise<ValorantApiRequestResponse<any>>;
    /**
     * @param {String} partyId Party ID
     * @param {String} team Team
     * @param {String} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    ChangeTeamInCustomGame(partyId: string, team: ValWrapperCustomGameTeam, puuid: string): Promise<ValorantApiRequestResponse<any>>;
    /**
     * * Careful to use, Riot will immediately shut down your Project.
     * @param {String} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    StartSoloExperience(puuid: string): Promise<ValorantApiRequestResponse<any>>;
    /**
     * * Careful to use, Riot will immediately shut down your Project.
     * @param {String} puuid Player UUID
     * @param {String} partyId Party ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    TransferOwner(puuid: string, partyId: string): Promise<ValorantApiRequestResponse<any>>;
}
export { Party };
export type { ValWrapperSetAccessibility, ValWrapperCustomGameSettings, ValWrapperCustomGameTeam };
//# sourceMappingURL=Party.d.ts.map