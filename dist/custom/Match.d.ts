import type { ValRequestClient, ValorantApiRequestResponse } from "@valapi/lib";
import type { ValorantApiRegion } from "@valapi/lib";
import { QueueId } from "@valapi/lib";
declare class Match {
    protected RequestClient: ValRequestClient;
    protected Region: ValorantApiRegion;
    /**
     * Class Constructor
     * @param {AxiosClient} AxiosClient Services Data
     * @param {ValorantApiRegion} Region Services Data
     */
    constructor(AxiosClient: ValRequestClient, Region: ValorantApiRegion);
    /**
     * Get contract definitions
     * @param {String} matchId Match ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    FetchMatchDetails(matchId: string): Promise<ValorantApiRequestResponse<any>>;
    /**
     * @param {String} puuid Player UUID
     * @param {String} queueId Queue
     * @param {Number} startIndex Start Index (default: 0)
     * @param {Number} endIndex End Index (default: 10)
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    FetchMatchHistory(puuid: string, queueId?: keyof typeof QueueId.from, startIndex?: number, endIndex?: number): Promise<ValorantApiRequestResponse<any>>;
}
export { Match };
//# sourceMappingURL=Match.d.ts.map