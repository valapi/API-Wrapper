import { AxiosClient, type ValWrapperAxios } from "../client/AxiosClient";
import { Event as CustomEvent } from "../client/Event";
import type { ValWrapperService } from "../client/Client";
import type { ValWrapperRegion } from "../client/Region";
import QueueId from "../resources/QueueId";
declare class Match extends CustomEvent {
    protected AxiosClient: AxiosClient;
    protected Region: ValWrapperRegion;
    /**
    * @param {ValWrapperService} data Services Data
    */
    constructor(data: ValWrapperService);
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