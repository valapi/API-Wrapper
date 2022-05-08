import type { AxiosClient, ValWrapperAxios } from "../client/AxiosClient";
import type { ValorantAPIRegion } from "@valapi/lib";
import { QueueId } from "@valapi/lib";
declare class Match {
    protected AxiosClient: AxiosClient;
    protected Region: ValorantAPIRegion;
    /**
    * @param {AxiosClient} AxiosClient Services Data
    * @param {ValorantAPIRegion} Region Services Data
    */
    constructor(AxiosClient: AxiosClient, Region: ValorantAPIRegion);
    /**
    * @description Get contract definitions
    * @param {String} matchId Match ID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    FetchMatchDetails(matchId: string): Promise<ValWrapperAxios<any>>;
    /**
    * @param {String} puuid Player UUID
    * @param {String} queue Queue
    * @param {Number} startIndex Start Index
    * @param {Number} endIndex End Index
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    FetchMatchHistory(puuid: string, queue?: keyof typeof QueueId.data, startIndex?: number, endIndex?: number): Promise<ValWrapperAxios<any>>;
}
export { Match };
//# sourceMappingURL=Match.d.ts.map