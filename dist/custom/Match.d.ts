import { type ValRequestClient, type ValRegion, QueueId } from "@valapi/lib";
declare class Match {
    private RequestClient;
    private Region;
    /**
     *
     * @param {ValRequestClient} ValRequestClient Request Client
     * @param {ValRegion.Json} Region Region Service Data
     */
    constructor(ValRequestClient: ValRequestClient, Region: ValRegion.Json);
    /**
     * Get contract definitions
     * @param {string} matchId Match ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    FetchMatchDetails(matchId: string): Promise<ValRequestClient.Response<any>>;
    /**
     * @param {string} puuid Player UUID
     * @param {string} queueId Queue
     * @param {number} startIndex Start Index (default: 0)
     * @param {number} endIndex End Index (default: 10)
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    FetchMatchHistory(puuid: string, queueId?: QueueId.String, startIndex?: number, endIndex?: number): Promise<ValRequestClient.Response<any>>;
}
export { Match };
