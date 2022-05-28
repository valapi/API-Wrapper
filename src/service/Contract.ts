//import
import type { ValRequestClient, ValorantApiRequestResponse } from "@valapi/lib";
import type { ValorantApiRegion } from "@valapi/lib";

//service

class Contract {
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
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
     public async DefinitionsFetch():Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.get(this.Region.url.playerData + `/contract-definitions/v3/item-upgrades`);
    }

    /**
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
     public async FetchActiveStory():Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.get(this.Region.url.playerData + `/contract-definitions/v2/definitions/story`);
    }

    /**
     * @param {String} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
     public async Fetch(puuid:string):Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.get(this.Region.url.playerData + `/contracts/v1/contracts/${puuid}`);
    }

    /**
     * @param {String} puuid Player UUID
     * @param {String} contractId Contract ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
     public async Activate(puuid:string, contractId:string):Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.post(this.Region.url.playerData + `/contracts/v1/contracts/${puuid}/special/${contractId}`);
    }
}

export { Contract };