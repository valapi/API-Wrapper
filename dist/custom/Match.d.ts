import type { ValRequestClient, ValorantApiRequestResponse } from "@valapi/lib";
import type { ValorantApiRegion } from "@valapi/lib";
import { QueueId } from "@valapi/lib";
declare class Match {
    private RequestClient;
    private Region;
    /**
     * Class Constructor
     * @param {ValRequestClient} AxiosClient Services Data
     * @param {ValorantApiRegion} Region Services Data
     */
    constructor(AxiosClient: ValRequestClient, Region: ValorantApiRegion);
    /**
     * Get contract definitions
     * @param {string} matchId Match ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    FetchMatchDetails(matchId: string): Promise<ValorantApiRequestResponse<any>>;
    /**
     * @param {string} puuid Player UUID
     * @param {string} queueId Queue
     * @param {number} startIndex Start Index (default: 0)
     * @param {number} endIndex End Index (default: 10)
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    FetchMatchHistory(puuid: string, queueId?: keyof typeof QueueId.from, startIndex?: number, endIndex?: number): Promise<ValorantApiRequestResponse<any>>;
}
export { Match };
