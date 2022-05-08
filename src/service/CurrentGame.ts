//import
import type { AxiosClient, ValWrapperAxios } from "../client/AxiosClient";
import type { ValorantAPIRegion } from "@valapi/lib";

//service
class CurrentGame {
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
     public async FetchMatch(matchId:string):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.get(this.Region.url.partyService + `/core-game/v1/matches/${matchId}`);
    }

    /**
    * @param {String} matchId Match ID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async FetchMatchLoadouts(matchId:string):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.get(this.Region.url.partyService + `/core-game/v1/matches/${matchId}/loadouts`);
    }

    /**
    * @param {String} puuid PlayerUUID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async FetchPlayer(puuid:string):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.get(this.Region.url.partyService + `/core-game/v1/players/${puuid}`);
    }

    /**
    * * Careful to use, Riot will immediately shut down your Project.
    * @param {String} puuid Player UUID
    * @param {String} matchId Match ID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async DisassociatePlayer(puuid:string, matchId:string):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.post(this.Region.url.partyService + `/core-game/v1/players/${puuid}/disassociate/${matchId}`);
    }
}

export { CurrentGame };