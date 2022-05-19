//import
import type { AxiosClient, ValWrapperAxios } from "../client/AxiosClient";
import type { ValorantAPIRegion } from "@valapi/lib";

//service

class Contract {
    protected AxiosClient:AxiosClient;
    protected Region:ValorantAPIRegion;

    /**
     * Class Constructor
     * @param {AxiosClient} AxiosClient Services Data
     * @param {ValorantAPIRegion} Region Services Data
     */
    public constructor(AxiosClient:AxiosClient, Region:ValorantAPIRegion) {
        this.AxiosClient = AxiosClient;
        this.Region = Region;
    }

    /**
     * @returns {Promise<ValWrapperAxios<any>>}
     */
     public async DefinitionsFetch():Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.get(this.Region.url.playerData + `/contract-definitions/v3/item-upgrades`);
    }

    /**
     * @returns {Promise<ValWrapperAxios<any>>}
     */
     public async FetchActiveStory():Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.get(this.Region.url.playerData + `/contract-definitions/v2/definitions/story`);
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