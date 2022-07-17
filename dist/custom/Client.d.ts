import type { ValRequestClient, ValorantApiRequestResponse } from "@valapi/lib";
import type { ValorantApiRegion } from "@valapi/lib";
declare class Client {
    private RequestClient;
    private Region;
    /**
     * Class Constructor
     * @param {ValRequestClient} AxiosClient Services Data
     * @param {ValorantApiRegion} Region Services Data
     */
    constructor(AxiosClient: ValRequestClient, Region: ValorantApiRegion);
    /**
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    FetchContent(): Promise<ValorantApiRequestResponse<any>>;
    /**
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    FetchConfig(): Promise<ValorantApiRequestResponse<any>>;
}
export { Client };
