//import

import { type ValRequestClient, type ValRegion, ItemTypeId } from "@valapi/lib";

//service

class Store {
    private RequestClient: ValRequestClient;
    private Region: ValRegion.Json;

    /**
     * 
     * @param {ValRequestClient} ValRequestClient Request Client
     * @param {ValRegion.Json} Region Region Service Data
     */
    public constructor(ValRequestClient: ValRequestClient, Region: ValRegion.Json) {
        this.RequestClient = ValRequestClient;
        this.Region = Region;
    }

    /**
     * @param {string} puuid Player UUID
     * @param {string} itemTypeId Item Type
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async GetEntitlements(puuid: string, itemTypeId: ItemTypeId.String): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.get(`${this.Region.url.playerData}/store/v1/entitlements/${puuid}/${itemTypeId}`);
    }

    /**
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async GetOffers(): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.get(`${this.Region.url.playerData}/store/v1/offers/`);
    }

    /**
     * @param {string} puuid Player UUID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async GetStorefront(puuid: string): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.get(`${this.Region.url.playerData}/store/v2/storefront/${puuid}`);
    }

    /**
     * @param {string} puuid Player UUID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async GetWallet(puuid: string): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.get(`${this.Region.url.playerData}/store/v1/wallet/${puuid}`);
    }

    // NOT IN DOCS //

    /**
     * * NOT TESTED
     * @param {string} puuid Player UUID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async RevealNightMarketOffers(puuid: string): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.post(`${this.Region.url.playerData}/store/v2/storefront/${puuid}/nightmarket/offers`);
    }
}

//export

export { Store };