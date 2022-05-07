import { AxiosClient, type ValWrapperAxios } from "../client/AxiosClient";
import { Event as CustomEvent } from "../client/Event";
import type { ValWrapperService } from "../client/Client";
import type { ValWrapperRegion } from "../client/Region";
import QueueId from "../resources/QueueId";
declare class Player extends CustomEvent {
    protected AxiosClient: AxiosClient;
    protected Region: ValWrapperRegion;
    /**
    * @param {ValWrapperService} data Services Data
    */
    constructor(data: ValWrapperService);
    /**
    * @param {String} puuid Player UUID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    GetUsername(puuid: string): Promise<ValWrapperAxios<any>>;
    /**
     * @returns {Promise<ValWrapperAxios<any>>}
    */
    GetUserInfo(): Promise<ValWrapperAxios<any>>;
    /**
    * @param {String} puuid Player UUID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    FetchPlayer(puuid: string): Promise<ValWrapperAxios<any>>;
    /**
    * @param {String} puuid Player UUID
    * @param {String} queue Queue
    * @param {Number} startIndex Start Index
    * @param {Number} endIndex End Index
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    FetchCompetitiveUpdates(puuid: string, queue?: keyof typeof QueueId.data, startIndex?: number, endIndex?: number): Promise<ValWrapperAxios<any>>;
    /**
    * @param {String} puuid PlayerUUID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    Loadout(puuid: string): Promise<ValWrapperAxios<any>>;
    /**
    * @param {String} puuid PlayerUUID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    AccountXP(puuid: string): Promise<ValWrapperAxios<any>>;
    /**
     * @returns {Promise<ValWrapperAxios<any>>}
    */
    FetchPlayerRestrictions(): Promise<ValWrapperAxios<any>>;
}
export { Player };
//# sourceMappingURL=Player.d.ts.map