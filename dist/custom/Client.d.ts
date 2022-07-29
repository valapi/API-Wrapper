import type { ValRequestClient, ValRegion } from "@valapi/lib";
declare class Client {
    private RequestClient;
    private Region;
    /**
     *
     * @param {ValRequestClient} ValRequestClient Request Client
     * @param {ValRegion.Json} Region Region Service Data
     */
    constructor(ValRequestClient: ValRequestClient, Region: ValRegion.Json);
    /**
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    FetchContent(): Promise<ValRequestClient.Response<any>>;
    /**
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    FetchConfig(): Promise<ValRequestClient.Response<any>>;
}
export { Client };
