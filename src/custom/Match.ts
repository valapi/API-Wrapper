//import
import type { AxiosClient, ValWrapperAxios } from "../client/AxiosClient";
import type { ValorantAPIRegion } from "@valapi/lib";

import { QueueId } from "@valapi/lib";

//service
class Match {
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

    //PVP Endpoints

    /**
    * Get contract definitions
    * @param {String} matchId Match ID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async FetchMatchDetails(matchId:string):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.get(this.Region.url.playerData + `/match-details/v1/matches/${matchId}`);
    }

    /**
    * @param {String} puuid Player UUID
    * @param {String} queueId Queue
    * @param {Number} startIndex Start Index
    * @param {Number} endIndex End Index
    * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async FetchMatchHistory(puuid:string, queueId?:keyof typeof QueueId, startIndex:number = 0, endIndex:number = 10):Promise<ValWrapperAxios<any>> {
        let _url = this.Region.url.playerData + `/match-history/v1/history/${puuid}?startIndex=${String(startIndex)}&endIndex=${String(endIndex)}` ;

        if(queueId === 'data'){
            this.AxiosClient.emit('error', {
                errorCode: 'ValWrapper_Request_Error',
                message: 'Queue ID cannot be "data"',
                data: queueId,
            })
        }

        if(queueId) {
            _url += `&queue=${queueId}`;
        }

        return await this.AxiosClient.get(_url);
    }
}

export { Match };