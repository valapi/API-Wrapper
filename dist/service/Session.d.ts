import type { ValRequestClient, ValRegion } from "@valapi/lib";
declare class Session {
    private RequestClient;
    private Region;
    /**
     *
     * @param {ValRequestClient} ValRequestClient Request Client
     * @param {ValRegion.Json} Region Region Service Data
     */
    constructor(ValRequestClient: ValRequestClient, Region: ValRegion.Json);
    /**
     * @param {string} puuid Player UUID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    Get(puuid: string): Promise<ValRequestClient.Response<any>>;
    /**
     * * Careful to use, Riot will immediately shut down your Project.
     * @param {string} puuid Player UUID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    ReConnect(puuid: string): Promise<ValRequestClient.Response<any>>;
}
export { Session };
