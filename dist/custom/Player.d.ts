import type { ValRequestClient, ValorantApiRequestResponse } from "@valapi/lib";
import type { ValorantApiRegion } from "@valapi/lib";
declare class Player {
    private RequestClient;
    private Region;
    private UserAgent;
    /**
     * Class Constructor
     * @param {ValRequestClient} AxiosClient Services Data
     * @param {ValorantApiRegion} Region Services Data
     */
    constructor(AxiosClient: ValRequestClient, Region: ValorantApiRegion, UserAgent: string);
    /**
     * @param {string} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    GetUsername(puuid: string): Promise<ValorantApiRequestResponse<any>>;
    /**
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    GetUserInfo(): Promise<ValorantApiRequestResponse<any>>;
    /**
     * @param {string} puuid PlayerUUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    AccountXP(puuid: string): Promise<ValorantApiRequestResponse<any>>;
    /**
     * @param {string} puuid PlayerUUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    Loadout(puuid: string): Promise<ValorantApiRequestResponse<any>>;
    /**
     * @param {string} puuid PlayerUUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    LoadoutUpdate(puuid: string): Promise<ValorantApiRequestResponse<any>>;
    /**
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    FetchPlayerRestrictions(): Promise<ValorantApiRequestResponse<any>>;
    /**
     * * IDK what this is
     * @param {string} puuid PlayerUUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    MassRewards(puuid: string): Promise<ValorantApiRequestResponse<any>>;
}
export { Player };
