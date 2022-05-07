//import
import { AxiosClient, type ValWrapperAxios } from "../client/AxiosClient";

import type { ValWrapperService } from "../client/Client";
import type { ValWrapperRegion } from "../client/Region";

//service
class Contract {
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
     * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async DefinitionsFetch():Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.get(this.Region.url.playerData + `/contract-definitions/v3/item-upgrades`);
    }

    /**
    * @param {String} puuid Player UUID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async Fetch(puuid:string):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.get(this.Region.url.playerData + `/contracts/v1/contracts/${puuid}`);
    }

    /**
    * @param {String} puuid Player UUID
    * @param {String} contractId Contract ID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async Activate(puuid:string, contractId:string):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.post(this.Region.url.playerData + `/contracts/v1/contracts/${puuid}/special/${contractId}`);
    }
}

export { Contract };