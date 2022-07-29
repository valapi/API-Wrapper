import { type ValRequestClient, type ValRegion, QueueId } from "@valapi/lib";
declare class MMR {
    private RequestClient;
    private Region;
    /**
     *
     * @param {ValRequestClient} ValRequestClient Request Client
     * @param {ValRegion.Json} Region Region Service Data
     */
    constructor(ValRequestClient: ValRequestClient, Region: ValRegion.Json);
    /**
     * @param {string} puuid Player UUID
     * @param {string} queueId Queue
     * @param {number} startIndex Start Index (default: 0)
     * @param {number} endIndex End Index (default: 10)
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    FetchCompetitiveUpdates(puuid: string, queueId?: QueueId.String, startIndex?: number, endIndex?: number): Promise<ValRequestClient.Response<any>>;
    /**
     * @param {string} seasonId Season ID
     * @param {number} startIndex Start Index (default: 0)
     * @param {number} size Size (default: 510)
     * @param {string} serachUsername Search Username
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    FetchLeaderboard(seasonId: string, startIndex?: number, size?: number, serachUsername?: string): Promise<ValRequestClient.Response<any>>;
    /**
     * @param {string} puuid Player UUID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    FetchPlayer(puuid: string): Promise<ValRequestClient.Response<any>>;
    /**
     * @param {string} puuid Player UUID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    HideActRankBadge(puuid: string): Promise<ValRequestClient.Response<any>>;
}
export { MMR };
