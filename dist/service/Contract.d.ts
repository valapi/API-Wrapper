import type { ValRequestClient, ValRegion } from "@valapi/lib";
declare class Contract {
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
    DefinitionsFetch(): Promise<ValRequestClient.Response<any>>;
    /**
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    FetchActiveStory(): Promise<ValRequestClient.Response<any>>;
    /**
     * @param {string} puuid Player UUID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    Fetch(puuid: string): Promise<ValRequestClient.Response<any>>;
    /**
     * @param {string} puuid Player UUID
     * @param {string} contractId Contract ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    Activate(puuid: string, contractId: string): Promise<ValRequestClient.Response<any>>;
}
export { Contract };
