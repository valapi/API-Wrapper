//import
import { AxiosClient, type ValWrapperAxios } from "../client/AxiosClient";

import type { ValWrapperService } from "../client/Client";
import type { ValWrapperRegion } from "../client/Region";

//service
class Client {
    public AxiosClient:AxiosClient;
    protected Region:ValWrapperRegion;

    /**
    * @param {ValWrapperService} data Services Data
    */
    constructor(data:ValWrapperService) {
        this.AxiosClient = new AxiosClient(data.AxiosData);
        this.Region = data.Region;
    }

    //SESSION
    /**
    * @param {String} puuid Player UUID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async GetSession(puuid:string):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.get(this.Region.url.partyService + `/session/v1/sessions/${puuid}`);
    }

    //PVP Endpoints
    
    /**
     * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async FetchContent():Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.get(this.Region.url.sharedData + `/content-service/v3/content`);
    }

    /**
     * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async FetchConfig():Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.get(this.Region.url.sharedData + `/v1/config/${this.Region.data.api}`);
    }
}

export { Client };