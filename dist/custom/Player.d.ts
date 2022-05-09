import type { AxiosClient, ValWrapperAxios } from "../client/AxiosClient";
import type { ValorantAPIRegion } from "@valapi/lib";
declare class Player {
    protected AxiosClient: AxiosClient;
    protected Region: ValorantAPIRegion;
    private UserAgent;
    /**
    * @param {AxiosClient} AxiosClient Services Data
    * @param {ValorantAPIRegion} Region Services Data
    */
    constructor(AxiosClient: AxiosClient, Region: ValorantAPIRegion, UserAgent: string);
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
    * @param {String} puuid PlayerUUID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    AccountXP(puuid: string): Promise<ValWrapperAxios<any>>;
    /**
    * @param {String} puuid PlayerUUID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    Loadout(puuid: string): Promise<ValWrapperAxios<any>>;
    /**
    * @param {String} puuid PlayerUUID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    LoadoutUpdate(puuid: string): Promise<ValWrapperAxios<any>>;
    /**
     * @returns {Promise<ValWrapperAxios<any>>}
    */
    FetchPlayerRestrictions(): Promise<ValWrapperAxios<any>>;
}
export { Player };
//# sourceMappingURL=Player.d.ts.map