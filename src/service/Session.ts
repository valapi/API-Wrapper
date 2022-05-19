//import
import type { AxiosClient, ValWrapperAxios } from "../client/AxiosClient";
import type { ValorantAPIRegion } from "@valapi/lib";

//service

class Session {
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
     * @param {String} puuid Player UUID
     * @returns {Promise<ValWrapperAxios<any>>}
     */
     public async Get(puuid:string):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.get(this.Region.url.partyService + `/session/v1/sessions/${puuid}`);
    }
    
    /**
     * * Careful to use, Riot will immediately shut down your Project.
     * @param {String} puuid Player UUID
     * @returns {Promise<ValWrapperAxios<any>>}
     */
     public async ReConnect(puuid:string):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.get(this.Region.url.partyService + `/session/v1/sessions/${puuid}/reconnect`);
    }
}

//export
export { Session };