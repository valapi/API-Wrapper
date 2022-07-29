//import

import type { ValRequestClient, ValRegion } from "@valapi/lib";

//service

class Session {
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
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async Get(puuid: string): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.get(`${this.Region.url.partyService}/session/v1/sessions/${puuid}`);
    }

    /**
     * * Careful to use, Riot will immediately shut down your Project.
     * @param {string} puuid Player UUID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async ReConnect(puuid: string): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.get(`${this.Region.url.partyService}/session/v1/sessions/${puuid}/reconnect`);
    }
}

//export

export { Session };