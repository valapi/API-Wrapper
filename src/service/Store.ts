//import
import { AxiosClient, type ValWrapperAxios } from "../client/AxiosClient";

import type { ValWrapperService } from "../client/Client";
import type { ValWrapperRegion } from "../client/Region";

import ItemTypeId from "../resources/ItemTypeId";

//service
class Store {
    public AxiosClient:AxiosClient;
    protected Region:ValWrapperRegion;

    /**
    * @param {ValWrapperService} data Services Data
    */
    constructor(data:ValWrapperService) {
        this.AxiosClient = new AxiosClient(data.AxiosData);
        this.Region = data.Region;
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