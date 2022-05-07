//import
import { AxiosClient, type ValWrapperAxiosError, type ValWrapperAxios } from "../client/AxiosClient";
import { Event as CustomEvent } from "../client/Event";

import type { ValWrapperService } from "../client/Client";
import type { ValWrapperRegion } from "../client/Region";

//service
class PreGame extends CustomEvent {
    protected AxiosClient:AxiosClient;
    protected Region:ValWrapperRegion;

    /**
    * @param {ValWrapperService} data Services Data
    */
    constructor(data:ValWrapperService) {
        super();
        
        this.AxiosClient = new AxiosClient(data.AxiosData);
        this.AxiosClient.on('error', ((data:ValWrapperAxiosError) => {
            this.emit('error', data);
        }));

        this.Region = data.Region;
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