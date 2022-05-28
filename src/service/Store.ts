//import
import type { ValRequestClient, ValorantApiRequestResponse } from "@valapi/lib";
import type { ValorantApiRegion } from "@valapi/lib";

import { ItemTypeId } from "@valapi/lib";

//service

class Store {
    protected RequestClient:ValRequestClient;
    protected Region:ValorantApiRegion;

    /**
     * Class Constructor
     * @param {ValRequestClient} ValRequestClient Services Data
     * @param {ValorantApiRegion} Region Services Data
     */
    public constructor(ValRequestClient:ValRequestClient, Region:ValorantApiRegion) {
        this.RequestClient = ValRequestClient;
        this.Region = Region;
    }

    /**
     * @param {String} puuid Player UUID
     * @param {String} itemTypeId Item Type
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
     public async GetEntitlements(puuid:string, itemTypeId:keyof typeof ItemTypeId.from):Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.get(this.Region.url.playerData + `/store/v1/entitlements/${puuid}/${itemTypeId}`);
    }

    /**
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
     public async GetOffers():Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.get(this.Region.url.playerData + `/store/v1/offers/`);
    }

    /**
     * @param {String} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
     public async GetStorefront(puuid:string):Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.get(this.Region.url.playerData + `/store/v2/storefront/${puuid}`);
    }

    /**
     * @param {String} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
     public async GetWallet(puuid:string):Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.get(this.Region.url.playerData + `/store/v1/wallet/${puuid}`);
    }

    // NOT IN DOCS //

    /**
     * * NOT TESTED
     * @param {String} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
     public async RevealNightMarketOffers(puuid:string):Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.post(this.Region.url.playerData + `/store/v2/storefront/${puuid}/nightmarket/offers`);
    }
}

export { Store };