//import

import type { ValRequestClient, ValRegion } from "@valapi/lib";

//service

class Client {
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

    //PVP Endpoints

    /**
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async FetchContent(): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.get(`${this.Region.url.sharedData}/content-service/v3/content`);
    }

    /**
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async FetchConfig(): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.get(`${this.Region.url.sharedData}/v1/config/${this.Region.data.api}`);
    }
}

//export

export { Client };