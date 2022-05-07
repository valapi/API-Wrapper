import { AxiosClient, type ValWrapperAxios } from "../client/AxiosClient";
import { Event as CustomEvent } from "../client/Event";
import type { ValWrapperService } from "../client/Client";
import type { ValWrapperRegion } from "../client/Region";
import QueueId from "../resources/QueueId";
declare type Party_SetAccessibility_accessibility = 'OPEN' | 'CLOSED';
declare class Party extends CustomEvent {
    protected AxiosClient: AxiosClient;
    protected Region: ValWrapperRegion;
    /**
    * @param {ValWrapperService} data Services Data
    */
    constructor(data: ValWrapperService);
    /**
     * @returns {Promise<ValWrapperAxios<any>>}
     */
    FetchCustomGameConfigs(): Promise<ValWrapperAxios<any>>;
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
    * @param {String} queue Queue
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    ChangeQueue(partyId: string, queue: keyof typeof QueueId.data): Promise<ValWrapperAxios<any>>;
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
    * @param {String} partyId Party ID
    * @param {String} accessibility Accessibility
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    SetAccessibility(partyId: string, accessibility: Party_SetAccessibility_accessibility): Promise<ValWrapperAxios<any>>;
    /**
    * @param {String} partyId Party ID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    StartCustomGame(partyId: string): Promise<ValWrapperAxios<any>>;
    /**
     *
     * @param {String} puuid Player UUID
     * @returns {Promise<ValWrapperAxios<any>>}
     */
    RemovePlayer(puuid: string): Promise<ValWrapperAxios<any>>;
    /**
     * @param {String} partyId Party ID
     * @param {String} requestId Request ID
     * @returns {Promise<ValWrapperAxios<any>>}
     */
    DeclineRequest(partyId: string, requestId: string): Promise<ValWrapperAxios<any>>;
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
    LeaveQueue(partyId: string): Promise<ValWrapperAxios<any>>;
}
export { Party };
export type { Party_SetAccessibility_accessibility };
//# sourceMappingURL=Party.d.ts.map