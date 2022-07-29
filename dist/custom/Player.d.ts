import type { ValRequestClient, ValRegion } from "@valapi/lib";
declare class Player {
    private RequestClient;
    private Region;
    private UserAgent;
    /**
     *
     * @param {ValRequestClient} ValRequestClient Request Client
     * @param {ValRegion.Json} Region Region Service Data
     * @param {string} UserAgent Request User Agent
     */
    constructor(ValRequestClient: ValRequestClient, Region: ValRegion.Json, UserAgent: string);
    /**
     * @param {string} puuid Player UUID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    GetUsername(puuid: string): Promise<ValRequestClient.Response<any>>;
    /**
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    GetUserInfo(): Promise<ValRequestClient.Response<any>>;
    /**
     * @param {string} puuid PlayerUUID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    AccountXP(puuid: string): Promise<ValRequestClient.Response<any>>;
    /**
     * @param {string} puuid PlayerUUID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    Loadout(puuid: string): Promise<ValRequestClient.Response<any>>;
    /**
     * @param {string} puuid PlayerUUID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    LoadoutUpdate(puuid: string): Promise<ValRequestClient.Response<any>>;
    /**
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    FetchPlayerRestrictions(): Promise<ValRequestClient.Response<any>>;
    /**
     * @param {string} puuid PlayerUUID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    MassRewards(puuid: string): Promise<ValRequestClient.Response<any>>;
}
export { Player };
