//import
import type { AxiosClient, ValWrapperAxios } from "../client/AxiosClient";
import type { ValorantAPIRegion } from "@valapi/lib";

//service
class Client {
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

//export
export { Client };