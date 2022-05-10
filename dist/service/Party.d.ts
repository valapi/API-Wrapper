import type { AxiosClient, ValWrapperAxios } from "../client/AxiosClient";
import type { ValorantAPIRegion } from "@valapi/lib";
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
    protected AxiosClient: AxiosClient;
    protected Region: ValorantAPIRegion;
    /**
    * @param {AxiosClient} AxiosClient Services Data
    * @param {ValorantAPIRegion} Region Services Data
    */
    constructor(AxiosClient: AxiosClient, Region: ValorantAPIRegion);
    /**
     *
     * @param {String} puuid Player UUID
     * @returns {Promise<ValWrapperAxios<any>>}
     */
    RemovePlayer(puuid: string): Promise<ValWrapperAxios<any>>;
    /**
     * @returns {Promise<ValWrapperAxios<any>>}
     */
    FetchCustomGameConfigs(): Promise<ValWrapperAxios<any>>;
    /**
    * @param {String} partyId Party ID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    FetchMUCToken(partyId: string): Promise<ValWrapperAxios<any>>;
    /**
    * @param {String} partyId Party ID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    FetchParty(partyId: string): Promise<ValWrapperAxios<any>>;
    /**
    * @param {String} puuid Player UUID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    FetchPlayer(puuid: string): Promise<ValWrapperAxios<any>>;
    /**
    * @param {String} partyId Party ID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    FetchVoiceToken(partyId: string): Promise<ValWrapperAxios<any>>;
    /**
    * @param {String} partyId Party ID
    * @param {String} queue Queue (EligibleQueues)
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    ChangeQueue(partyId: string, queue: keyof typeof QueueId.data): Promise<ValWrapperAxios<any>>;
    /**
     * @param {String} partyId Party ID
     * @param {String} requestId Request ID
     * @returns {Promise<ValWrapperAxios<any>>}
     */
    DeclineRequest(partyId: string, requestId: string): Promise<ValWrapperAxios<any>>;
    /**
    * @param {String} partyId Party ID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    EnterMatchmakingQueue(partyId: string): Promise<ValWrapperAxios<any>>;
    /**
    * @param {String} partyId Party ID
    * @param {String} gameName In-Game Name
    * @param {String} tagLine In-Game Tag
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    InviteToPartyByDisplayName(partyId: string, gameName: string, tagLine: string): Promise<ValWrapperAxios<any>>;
    /**
    * @param {String} partyId Party ID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    LeaveMatchmakingQueue(partyId: string): Promise<ValWrapperAxios<any>>;
    /**
    * @param {String} puuid Player UUID
    * @param {String} partyId Party ID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    RefreshCompetitiveTier(puuid: string, partyId: string): Promise<ValWrapperAxios<any>>;
    /**
    * @param {String} puuid Player UUID
    * @param {String} partyId Party ID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    RefreshPings(puuid: string, partyId: string): Promise<ValWrapperAxios<any>>;
    /**
    * @param {String} puuid Player UUID
    * @param {String} partyId Party ID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    RefreshPlayerIdentity(puuid: string, partyId: string): Promise<ValWrapperAxios<any>>;
    /**
    * @param {String} partyId Party ID
    * @param {String} accessibility Accessibility
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    SetAccessibility(partyId: string, accessibility: ValWrapperSetAccessibility): Promise<ValWrapperAxios<any>>;
    /**
    * @param {String} partyId Party ID
    * @param {CustomGame_Settings} settings Custom Game Settings
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    SetCustomGameSettings(partyId: string, settings: ValWrapperCustomGameSettings): Promise<ValWrapperAxios<any>>;
    /**
    * @param {String} puuid Player UUID
    * @param {String} partyId Party ID
    * @param {boolean} ready Ready or not?
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    SetMemberReady(puuid: string, partyId: string, ready: boolean): Promise<ValWrapperAxios<any>>;
    /**
    * @param {String} partyId Party ID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    StartCustomGame(partyId: string): Promise<ValWrapperAxios<any>>;
    /**
    * @param {String} puuid Player UUID
    * @param {String} partyId Party ID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    LeaveParty(puuid: string, partyId: string): Promise<ValWrapperAxios<any>>;
    /**
    * @param {String} partyId Party ID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    AutoBalance(partyId: string): Promise<ValWrapperAxios<any>>;
    /**
    * @param {String} partyId Party ID
    * @param {String} team Team
    * @param {String} puuid Player UUID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    ChangeTeamInCustomGame(partyId: string, team: ValWrapperCustomGameTeam, puuid: string): Promise<ValWrapperAxios<any>>;
    /**
     * * Careful to use, Riot will immediately shut down your Project.
    * @param {String} puuid Player UUID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    StartSoloExperience(puuid: string): Promise<ValWrapperAxios<any>>;
}
export { Party };
export type { ValWrapperSetAccessibility, ValWrapperCustomGameSettings, ValWrapperCustomGameTeam };
//# sourceMappingURL=Party.d.ts.map