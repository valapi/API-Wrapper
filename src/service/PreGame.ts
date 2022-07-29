//import

import type { ValRequestClient, ValRegion } from "@valapi/lib";

//service

class PreGame {
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
    public async FetchChatToken(matchId: string): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.get(`${this.Region.url.partyService}/pregame/v1/matches/${matchId}/chattoken`);
    }

    /**
     * @param {string} matchId Match ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async FetchVoiceToken(matchId: string): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.get(`${this.Region.url.partyService}/pregame/v1/matches/${matchId}/voicetoken`);
    }

    /**
     * @param {string} matchId Match ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async GetMatch(matchId: string): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.get(`${this.Region.url.partyService}/pregame/v1/matches/${matchId}`);
    }

    /**
     * @param {string} matchId Match ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async GetMatchLoadouts(matchId: string): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.get(`${this.Region.url.partyService}/pregame/v1/matches/${matchId}/loadouts`);
    }

    /**
     * @param {string} puuid Player UUID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async GetPlayer(puuid: string): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.get(`${this.Region.url.partyService}/pregame/v1/players/${puuid}`);
    }

    /**
     * * Careful to use, Riot will immediately shut down your Project.
     * @param {string} matchId Match ID
     * @param {string} agentId Character ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async LockCharacter(matchId: string, agentId: string): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.post(`${this.Region.url.partyService}/pregame/v1/matches/${matchId}/lock/${agentId}`);
    }

    /**
     * * Careful to use, Riot will immediately shut down your Project.
     * @param {string} matchId Match ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async QuitMatch(matchId: string): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.post(`${this.Region.url.partyService}/pregame/v1/matches/${matchId}/quit`);
    }

    /**
     * * Careful to use, Riot will immediately shut down your Project.
     * @param {string} matchId Match ID
     * @param {string} agentId Character ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async SelectCharacter(matchId: string, agentId: string): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.post(`${this.Region.url.partyService}/pregame/v1/matches/${matchId}/select/${agentId}`);
    }
}

//export

export { PreGame };