//import

import type { ValRequestClient, ValorantApiRequestResponse } from "@valapi/lib";
import type { ValorantApiRegion } from "@valapi/lib";

//service

class CurrentGame {
    private RequestClient: ValRequestClient;
    private Region: ValorantApiRegion;

    /**
     * Class Constructor
     * @param {ValRequestClient} ValRequestClient Request Client
     * @param {ValorantApiRegion} Region Region Service Data
     */
    public constructor(ValRequestClient: ValRequestClient, Region: ValorantApiRegion) {
        this.RequestClient = ValRequestClient;
        this.Region = Region;
    }

    /**
     * @param {string} matchId Match ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    public async FetchAllChatMUCToken(matchId: string): Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.get(this.Region.url.partyService + `/core-game/v1/matches/${matchId}/allchatmuctoken`);
    }

    /**
     * @param {string} matchId Match ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    public async FetchMatch(matchId: string): Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.get(this.Region.url.partyService + `/core-game/v1/matches/${matchId}`);
    }

    /**
     * @param {string} matchId Match ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    public async FetchMatchLoadouts(matchId: string): Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.get(this.Region.url.partyService + `/core-game/v1/matches/${matchId}/loadouts`);
    }

    /**
     * @param {string} puuid PlayerUUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    public async FetchPlayer(puuid: string): Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.get(this.Region.url.partyService + `/core-game/v1/players/${puuid}`);
    }

    /**
     * @param {string} matchId Match ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    public async FetchTeamChatMUCToken(matchId: string): Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.get(this.Region.url.partyService + `/core-game/v1/matches/${matchId}/teamchatmuctoken`);
    }

    /**
     * * Careful to use, Riot will immediately shut down your Project.
     * @param {string} puuid Player UUID
     * @param {string} matchId Match ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    public async DisassociatePlayer(puuid: string, matchId: string): Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.post(this.Region.url.partyService + `/core-game/v1/players/${puuid}/disassociate/${matchId}`);
    }
}

//export

export { CurrentGame };