//import

import type { ValRequestClient, ValRegion } from "@valapi/lib";

//service

class Contract {
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
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async DefinitionsFetch(): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.get(`${this.Region.url.playerData}/contract-definitions/v3/item-upgrades`);
    }

    /**
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async FetchActiveStory(): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.get(`${this.Region.url.playerData}/contract-definitions/v2/definitions/story`);
    }

    /**
     * @param {string} puuid Player UUID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async Fetch(puuid: string): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.get(`${this.Region.url.playerData}/contracts/v1/contracts/${puuid}`);
    }

    /**
     * @param {string} puuid Player UUID
     * @param {string} contractId Contract ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async Activate(puuid: string, contractId: string): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.post(`${this.Region.url.playerData}/contracts/v1/contracts/${puuid}/special/${contractId}`);
    }
}

//export

export { Contract };