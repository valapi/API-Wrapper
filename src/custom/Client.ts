//import

import type { ValRequestClient, ValorantApiRequestResponse } from "@valapi/lib";
import type { ValorantApiRegion } from "@valapi/lib";

//service

class Client {
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

    //PVP Endpoints

    /**
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    public async FetchContent(): Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.get(`${this.Region.url.sharedData}/content-service/v3/content`);
    }

    /**
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    public async FetchConfig(): Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.get(`${this.Region.url.sharedData}/v1/config/${this.Region.data.api}`);
    }
}

//export

export { Client };