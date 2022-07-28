//import

import type { ValRequestClient, ValorantApiRequestResponse } from "@valapi/lib";
import type { ValorantApiRegion } from "@valapi/lib";

import { ItemTypeId } from "@valapi/lib";

//service

class Store {
    private RequestClient: ValRequestClient;
    private Region: ValorantApiRegion;

    /**
     * Class Constructor
     * @param {ValRequestClient} ValRequestClient Request Client
     * @param {ValorantApiRegion} Region Region Service Data
     */
    public constructor(ValRequestClient: ValRequestClient, Region: ValorantApiRegion) {
        this.RequestClient = ValRequestClient;
        this.Region = Region;
    }

    /**
     * @param {string} puuid Player UUID
     * @param {string} itemTypeId Item Type
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    public async GetEntitlements(puuid: string, itemTypeId: keyof typeof ItemTypeId.from): Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.get(`${this.Region.url.playerData}/store/v1/entitlements/${puuid}/${itemTypeId}`);
    }

    /**
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    public async GetOffers(): Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.get(`${this.Region.url.playerData}/store/v1/offers/`);
    }

    /**
     * @param {string} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    public async GetStorefront(puuid: string): Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.get(`${this.Region.url.playerData}/store/v2/storefront/${puuid}`);
    }

    /**
     * @param {string} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    public async GetWallet(puuid: string): Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.get(`${this.Region.url.playerData}/store/v1/wallet/${puuid}`);
    }

    // NOT IN DOCS //

    /**
     * * NOT TESTED
     * @param {string} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    public async RevealNightMarketOffers(puuid: string): Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.post(`${this.Region.url.playerData}/store/v2/storefront/${puuid}/nightmarket/offers`);
    }
}

//export

export { Store };