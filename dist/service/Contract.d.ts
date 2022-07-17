import type { ValRequestClient, ValorantApiRequestResponse } from "@valapi/lib";
import type { ValorantApiRegion } from "@valapi/lib";
declare class Contract {
    private RequestClient;
    private Region;
    /**
     * Class Constructor
     * @param {ValRequestClient} ValRequestClient Services Data
     * @param {ValorantApiRegion} Region Services Data
     */
    constructor(ValRequestClient: ValRequestClient, Region: ValorantApiRegion);
    /**
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    DefinitionsFetch(): Promise<ValorantApiRequestResponse<any>>;
    /**
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    FetchActiveStory(): Promise<ValorantApiRequestResponse<any>>;
    /**
     * @param {string} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    Fetch(puuid: string): Promise<ValorantApiRequestResponse<any>>;
    /**
     * @param {string} puuid Player UUID
     * @param {string} contractId Contract ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    Activate(puuid: string, contractId: string): Promise<ValorantApiRequestResponse<any>>;
}
export { Contract };
