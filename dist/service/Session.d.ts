import type { ValRequestClient, ValorantApiRequestResponse } from "@valapi/lib";
import type { ValorantApiRegion } from "@valapi/lib";
declare class Session {
    private RequestClient;
    private Region;
    /**
     * Class Constructor
     * @param {ValRequestClient} ValRequestClient Services Data
     * @param {ValorantApiRegion} Region Services Data
     */
    constructor(ValRequestClient: ValRequestClient, Region: ValorantApiRegion);
    /**
     * @param {string} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    Get(puuid: string): Promise<ValorantApiRequestResponse<any>>;
    /**
     * * Careful to use, Riot will immediately shut down your Project.
     * @param {string} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    ReConnect(puuid: string): Promise<ValorantApiRequestResponse<any>>;
}
export { Session };
