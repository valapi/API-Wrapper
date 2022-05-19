import type { AxiosClient, ValWrapperAxios } from "../client/AxiosClient";
import type { ValorantAPIRegion } from "@valapi/lib";
import { QueueId } from "@valapi/lib";
declare class Match {
    protected AxiosClient: AxiosClient;
    protected Region: ValorantAPIRegion;
    /**
     * Class Constructor
     * @param {AxiosClient} AxiosClient Services Data
     * @param {ValorantAPIRegion} Region Services Data
     */
    constructor(AxiosClient: AxiosClient, Region: ValorantAPIRegion);
    /**
     * Get contract definitions
     * @param {String} matchId Match ID
     * @returns {Promise<ValWrapperAxios<any>>}
     */
    FetchMatchDetails(matchId: string): Promise<ValWrapperAxios<any>>;
    /**
     * @param {String} puuid Player UUID
     * @param {String} queueId Queue
     * @param {Number} startIndex Start Index
     * @param {Number} endIndex End Index
     * @returns {Promise<ValWrapperAxios<any>>}
     */
    FetchMatchHistory(puuid: string, queueId?: keyof typeof QueueId, startIndex?: number, endIndex?: number): Promise<ValWrapperAxios<any>>;
}
export { Match };
//# sourceMappingURL=Match.d.ts.map