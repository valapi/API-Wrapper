//import
import type { ValRequestClient, ValorantApiRequestResponse } from "@valapi/lib";
import type { ValorantApiRegion } from "@valapi/lib";

//service

class CurrentGame {
    protected RequestClient:ValRequestClient;
    protected Region:ValorantApiRegion;

    /**
     * Class Constructor
     * @param {ValRequestClient} ValRequestClient Services Data
     * @param {ValorantApiRegion} Region Services Data
     */
    public constructor(ValRequestClient:ValRequestClient, Region:ValorantApiRegion) {
        this.RequestClient = ValRequestClient;
        this.Region = Region;
    }

    /**
     * @param {String} matchId Match ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
     public async FetchAllChatMUCToken(matchId:string):Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.get(this.Region.url.partyService + `/core-game/v1/matches/${matchId}/allchatmuctoken`);
    }

    /**
     * @param {String} matchId Match ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
     public async FetchMatch(matchId:string):Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.get(this.Region.url.partyService + `/core-game/v1/matches/${matchId}`);
    }

    /**
     * @param {String} matchId Match ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
     public async FetchMatchLoadouts(matchId:string):Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.get(this.Region.url.partyService + `/core-game/v1/matches/${matchId}/loadouts`);
    }

    /**
     * @param {String} puuid PlayerUUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
     public async FetchPlayer(puuid:string):Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.get(this.Region.url.partyService + `/core-game/v1/players/${puuid}`);
    }

    /**
     * @param {String} matchId Match ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
     public async FetchTeamChatMUCToken(matchId:string):Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.get(this.Region.url.partyService + `/core-game/v1/matches/${matchId}/teamchatmuctoken`);
    }

    /**
     * * Careful to use, Riot will immediately shut down your Project.
     * @param {String} puuid Player UUID
     * @param {String} matchId Match ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
     public async DisassociatePlayer(puuid:string, matchId:string):Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.post(this.Region.url.partyService + `/core-game/v1/players/${puuid}/disassociate/${matchId}`);
    }
}

export { CurrentGame };