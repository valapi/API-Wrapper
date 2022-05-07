//import
import { AxiosClient, type ValWrapperAxiosError, type ValWrapperAxios } from "../client/AxiosClient";
import { Event as CustomEvent } from "../client/Event";

import type { ValWrapperService } from "../client/Client";
import type { ValWrapperRegion } from "../client/Region";

import QueueId from "../resources/QueueId";

//service
class Match extends CustomEvent {
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

    //PVP Endpoints

    /**
    * @description Get contract definitions
    * @param {String} matchId Match ID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async FetchMatchDetails(matchId:string):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.get(this.Region.url.playerData + `/match-details/v1/matches/${matchId}`);
    }

    /**
    * @param {String} puuid Player UUID
    * @param {String} queue Queue
    * @param {Number} startIndex Start Index
    * @param {Number} endIndex End Index
    * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async FetchMatchHistory(puuid:string, queue?:keyof typeof QueueId.data, startIndex:number = 0, endIndex:number = 10):Promise<ValWrapperAxios<any>> {
        let _url = this.Region.url.playerData + `/match-history/v1/history/${puuid}?startIndex=${String(startIndex)}&endIndex=${String(endIndex)}` ;
        if(queue) {
            _url += `&queue=${QueueId.data[queue]}`;
        }

        return await this.AxiosClient.get(_url);
    }
}

export { Match };