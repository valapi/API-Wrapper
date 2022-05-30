import type { ValRequestClient, ValorantApiRequestResponse } from "@valapi/lib";
import type { ValorantApiRegion } from "@valapi/lib";
import { QueueId } from "@valapi/lib";
declare class MMR {
    protected RequestClient: ValRequestClient;
    protected Region: ValorantApiRegion;
    /**
     * Class Constructor
     * @param {AxiosClient} AxiosClient Services Data
     * @param {ValorantApiRegion} Region Services Data
     */
    constructor(AxiosClient: ValRequestClient, Region: ValorantApiRegion);
    /**
     * @param {String} puuid Player UUID
     * @param {String} queueId Queue
     * @param {Number} startIndex Start Index (default: 0)
     * @param {Number} endIndex End Index (default: 10)
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    FetchCompetitiveUpdates(puuid: string, queueId?: keyof typeof QueueId.from, startIndex?: number, endIndex?: number): Promise<ValorantApiRequestResponse<any>>;
    /**
     * @param {String} seasonId Season ID
     * @param {Number} startIndex Start Index (default: 0)
     * @param {Number} size Size (default: 510)
     * @param {String} serachUsername Search Username
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    FetchLeaderboard(seasonId: string, startIndex?: number, size?: number, serachUsername?: string): Promise<ValorantApiRequestResponse<any>>;
    /**
     * @param {String} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    FetchPlayer(puuid: string): Promise<ValorantApiRequestResponse<any>>;
    /**
     * @param {String} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    HideActRankBadge(puuid: string): Promise<ValorantApiRequestResponse<any>>;
}
export { MMR };
//# sourceMappingURL=MMR.d.ts.map