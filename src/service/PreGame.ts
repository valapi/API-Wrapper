//import
import type { AxiosClient, ValWrapperAxios } from "../client/AxiosClient";
import type { ValorantAPIRegion } from "@valapi/lib";

//service
class PreGame {
    protected AxiosClient:AxiosClient;
    protected Region:ValorantAPIRegion;

    /**
    * @param {AxiosClient} AxiosClient Services Data
    * @param {ValorantAPIRegion} Region Services Data
    */
    constructor(AxiosClient:AxiosClient, Region:ValorantAPIRegion) {
        this.AxiosClient = AxiosClient;
        this.Region = Region;
    }

    /**
    * @param {String} matchId Match ID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async FetchChatToken(matchId:string):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.get(this.Region.url.partyService + `/pregame/v1/matches/${matchId}/chattoken`);
    }

    /**
    * @param {String} matchId Match ID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async FetchVoiceToken(matchId:string):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.get(this.Region.url.partyService + `/pregame/v1/matches/${matchId}/voicetoken`);
    }

    /**
    * @param {String} matchId Match ID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async GetMatch(matchId:string):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.get(this.Region.url.partyService + `/pregame/v1/matches/${matchId}`);
    }

    /**
    * @param {String} matchId Match ID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async GetMatchLoadouts(matchId:string):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.get(this.Region.url.partyService + `/pregame/v1/matches/${matchId}/loadouts`);
    }

    /**
    * @param {String} puuid Player UUID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async GetPlayer(puuid:string):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.get(this.Region.url.partyService + `/pregame/v1/players/${puuid}`);
    }

    /**
    * @param {String} matchId Match ID
    * @param {String} agentId Character ID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async LockCharacter(matchId:string, agentId:string):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.post(this.Region.url.partyService + `/pregame/v1/matches/${matchId}/lock/${agentId}`);
    }

    /**
     * * Careful to use, Riot will immediately shut down your Project.
    * @param {String} matchId Match ID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async QuitMatch(matchId:string):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.post(this.Region.url.partyService + `/pregame/v1/matches/${matchId}/quit`);
    }

    /**
    * @param {String} matchId Match ID
    * @param {String} agentId Character ID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async SelectCharacter(matchId:string, agentId:string):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.post(this.Region.url.partyService + `/pregame/v1/matches/${matchId}/select/${agentId}`);
    }
}

export { PreGame };