//import

import type { ValRequestClient, ValRegion } from "@valapi/lib";

//service

class CurrentGame {
    private RequestClient: ValRequestClient;
    private Region: ValRegion.Json;

    /**
     * 
     * @param {ValRequestClient} ValRequestClient Request Client
     * @param {ValRegion.Json} Region Region Service Data
     */
    public constructor(ValRequestClient: ValRequestClient, Region: ValRegion.Json) {
        this.RequestClient = ValRequestClient;
        this.Region = Region;
    }

    /**
     * @param {string} matchId Match ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async FetchAllChatMUCToken(matchId: string): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.get(`${this.Region.url.partyService}/core-game/v1/matches/${matchId}/allchatmuctoken`);
    }

    /**
     * @param {string} matchId Match ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async FetchMatch(matchId: string): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.get(`${this.Region.url.partyService}/core-game/v1/matches/${matchId}`);
    }

    /**
     * @param {string} matchId Match ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async FetchMatchLoadouts(matchId: string): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.get(`${this.Region.url.partyService}/core-game/v1/matches/${matchId}/loadouts`);
    }

    /**
     * @param {string} puuid PlayerUUID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async FetchPlayer(puuid: string): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.get(`${this.Region.url.partyService}/core-game/v1/players/${puuid}`);
    }

    /**
     * @param {string} matchId Match ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async FetchTeamChatMUCToken(matchId: string): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.get(`${this.Region.url.partyService}/core-game/v1/matches/${matchId}/teamchatmuctoken`);
    }

    /**
     * * Careful to use, Riot will immediately shut down your Project.
     * @param {string} puuid Player UUID
     * @param {string} matchId Match ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async DisassociatePlayer(puuid: string, matchId: string): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.post(`${this.Region.url.partyService}/core-game/v1/players/${puuid}/disassociate/${matchId}`);
    }
}

//export

export { CurrentGame };