import type { ValRequestClient, ValorantApiRequestResponse } from "@valapi/lib";
import type { ValorantApiRegion } from "@valapi/lib";
import { QueueId } from "@valapi/lib";
declare class MMR {
    private RequestClient;
    private Region;
    /**
     * Class Constructor
     * @param {ValRequestClient} AxiosClient Services Data
     * @param {ValorantApiRegion} Region Services Data
     */
    constructor(AxiosClient: ValRequestClient, Region: ValorantApiRegion);
    /**
     * @param {string} puuid Player UUID
     * @param {string} queueId Queue
     * @param {number} startIndex Start Index (default: 0)
     * @param {number} endIndex End Index (default: 10)
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    FetchCompetitiveUpdates(puuid: string, queueId?: keyof typeof QueueId.from, startIndex?: number, endIndex?: number): Promise<ValorantApiRequestResponse<any>>;
    /**
     * @param {string} seasonId Season ID
     * @param {number} startIndex Start Index (default: 0)
     * @param {number} size Size (default: 510)
     * @param {string} serachUsername Search Username
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    FetchLeaderboard(seasonId: string, startIndex?: number, size?: number, serachUsername?: string): Promise<ValorantApiRequestResponse<any>>;
    /**
     * @param {string} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    FetchPlayer(puuid: string): Promise<ValorantApiRequestResponse<any>>;
    /**
     * @param {string} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    HideActRankBadge(puuid: string): Promise<ValorantApiRequestResponse<any>>;
}
export { MMR };
