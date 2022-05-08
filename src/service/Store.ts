//import
import type { AxiosClient, ValWrapperAxios } from "../client/AxiosClient";
import type { ValorantAPIRegion } from "@valapi/lib";

import { ItemTypeId } from "@valapi/lib";

//service
class Store {
    protected AxiosClient:AxiosClient;
    protected Region:ValorantAPIRegion;

    /**
    * @param {AxiosClient} AxiosClient Services Data
    * @param {ValorantAPIRegion} Region Services Data
    */
    constructor(AxiosClient:AxiosClient, Region:ValorantAPIRegion) {
        this.AxiosClient = AxiosClient;
        this.Region = Region;
    }

    /**
    * @param {String} puuid Player UUID
    * @param {String} itemType Item Type
    * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async GetEntitlements(puuid:string, itemType:keyof typeof ItemTypeId.data):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.get(this.Region.url.playerData + `/store/v1/entitlements/${puuid}/${ItemTypeId.data[itemType]}`);
    }

    /**
     * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async GetOffers():Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.get(this.Region.url.playerData + `/store/v1/offers/`);
    }

    /**
    * @param {String} puuid Player UUID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async GetStorefront(puuid:string):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.get(this.Region.url.playerData + `/store/v2/storefront/${puuid}`);
    }

    /**
    * @param {String} puuid Player UUID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async GetWallet(puuid:string):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.get(this.Region.url.playerData + `/store/v1/wallet/${puuid}`);
    }
}

export { Store };