import { type ValRequestClient, type ValRegion, ItemTypeId } from "@valapi/lib";
declare class Store {
    private RequestClient;
    private Region;
    /**
     *
     * @param {ValRequestClient} ValRequestClient Request Client
     * @param {ValRegion.Json} Region Region Service Data
     */
    constructor(ValRequestClient: ValRequestClient, Region: ValRegion.Json);
    /**
     * @param {string} puuid Player UUID
     * @param {string} itemTypeId Item Type
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    GetEntitlements(puuid: string, itemTypeId: ItemTypeId.String): Promise<ValRequestClient.Response<any>>;
    /**
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    GetOffers(): Promise<ValRequestClient.Response<any>>;
    /**
     * @param {string} puuid Player UUID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    GetStorefront(puuid: string): Promise<ValRequestClient.Response<any>>;
    /**
     * @param {string} puuid Player UUID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    GetWallet(puuid: string): Promise<ValRequestClient.Response<any>>;
    /**
     * * NOT TESTED
     * @param {string} puuid Player UUID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    RevealNightMarketOffers(puuid: string): Promise<ValRequestClient.Response<any>>;
}
export { Store };
