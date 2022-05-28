import type { ValRequestClient, ValorantApiRequestResponse } from "@valapi/lib";
import type { ValorantApiRegion } from "@valapi/lib";
declare class Session {
    protected RequestClient: ValRequestClient;
    protected Region: ValorantApiRegion;
    /**
     * Class Constructor
     * @param {ValRequestClient} ValRequestClient Services Data
     * @param {ValorantApiRegion} Region Services Data
     */
    constructor(ValRequestClient: ValRequestClient, Region: ValorantApiRegion);
    /**
     * @param {String} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    Get(puuid: string): Promise<ValorantApiRequestResponse<any>>;
    /**
     * * Careful to use, Riot will immediately shut down your Project.
     * @param {String} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    ReConnect(puuid: string): Promise<ValorantApiRequestResponse<any>>;
}
export { Session };
//# sourceMappingURL=Session.d.ts.map