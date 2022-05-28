//import
import type { ValRequestClient, ValorantApiRequestResponse } from "@valapi/lib";
import type { ValorantApiRegion } from "@valapi/lib";

//service

class PreGame {
    protected RequestClient:ValRequestClient;
    protected Region:ValorantApiRegion;

    /**
    * @param {ValRequestClient} ValRequestClient Services Data
    * @param {ValorantApiRegion} Region Services Data
    */
    public constructor(ValRequestClient:ValRequestClient, Region:ValorantApiRegion) {
        this.RequestClient = ValRequestClient;
        this.Region = Region;
    }

    /**
     * Class Constructor
     * @param {String} matchId Match ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
     public async FetchChatToken(matchId:string):Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.get(this.Region.url.partyService + `/pregame/v1/matches/${matchId}/chattoken`);
    }

    /**
     * @param {String} matchId Match ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
     public async FetchVoiceToken(matchId:string):Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.get(this.Region.url.partyService + `/pregame/v1/matches/${matchId}/voicetoken`);
    }

    /**
     * @param {String} matchId Match ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
     public async GetMatch(matchId:string):Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.get(this.Region.url.partyService + `/pregame/v1/matches/${matchId}`);
    }

    /**
     * @param {String} matchId Match ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
     public async GetMatchLoadouts(matchId:string):Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.get(this.Region.url.partyService + `/pregame/v1/matches/${matchId}/loadouts`);
    }

    /**
     * @param {String} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
     public async GetPlayer(puuid:string):Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.get(this.Region.url.partyService + `/pregame/v1/players/${puuid}`);
    }

    /**
     * @param {String} matchId Match ID
     * @param {String} agentId Character ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
     public async LockCharacter(matchId:string, agentId:string):Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.post(this.Region.url.partyService + `/pregame/v1/matches/${matchId}/lock/${agentId}`);
    }

    /**
     * * Careful to use, Riot will immediately shut down your Project.
     * @param {String} matchId Match ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
     public async QuitMatch(matchId:string):Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.post(this.Region.url.partyService + `/pregame/v1/matches/${matchId}/quit`);
    }

    /**
     * @param {String} matchId Match ID
     * @param {String} agentId Character ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
     public async SelectCharacter(matchId:string, agentId:string):Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.post(this.Region.url.partyService + `/pregame/v1/matches/${matchId}/select/${agentId}`);
    }
}

export { PreGame };