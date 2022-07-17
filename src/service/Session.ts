//import

import type { ValRequestClient, ValorantApiRequestResponse } from "@valapi/lib";
import type { ValorantApiRegion } from "@valapi/lib";

//service

class Session {
    private RequestClient: ValRequestClient;
    private Region: ValorantApiRegion;

    /**
     * Class Constructor
     * @param {ValRequestClient} ValRequestClient Services Data
     * @param {ValorantApiRegion} Region Services Data
     */
    public constructor(ValRequestClient: ValRequestClient, Region: ValorantApiRegion) {
        this.RequestClient = ValRequestClient;
        this.Region = Region;
    }

    /**
     * @param {string} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    public async Get(puuid: string): Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.get(this.Region.url.partyService + `/session/v1/sessions/${puuid}`);
    }

    /**
     * * Careful to use, Riot will immediately shut down your Project.
     * @param {string} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    public async ReConnect(puuid: string): Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.get(this.Region.url.partyService + `/session/v1/sessions/${puuid}/reconnect`);
    }
}

//export

export { Session };