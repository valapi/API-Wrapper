//import
import type { AxiosClient, ValWrapperAxios } from "../client/AxiosClient";
import type { ValorantAPIRegion } from "@valapi/lib";

import { QueueId } from "@valapi/lib";

//service
class MMR {
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
    * @param {String} puuid Player UUID
    * @param {String} queue Queue
    * @param {Number} startIndex Start Index
    * @param {Number} endIndex End Index
    * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async FetchCompetitiveUpdates(puuid:string, queue?:keyof typeof QueueId.data, startIndex:number = 0, endIndex:number = 10):Promise<ValWrapperAxios<any>> {
        let _url = this.Region.url.playerData + `/mmr/v1/players/${puuid}/competitiveupdates?startIndex=${String(startIndex)}&endIndex=${String(endIndex)}`;
        if (queue) {
            _url += `&queue=${QueueId.data[queue]}`;
        }

        return await this.AxiosClient.get(_url);
    }

    /**
    * @param {String} seasonId Season ID
    * @param {Number} startIndex Start Index
    * @param {Number} size Size
    * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async FetchLeaderboard(seasonId:string, startIndex:number = 0, size:number = 510):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.get(this.Region.url.playerData + `/mmr/v1/leaderboards/affinity/na/queue/competitive/season/${seasonId}?startIndex=${startIndex}&size=${size}`);
    }

    /**
    * @param {String} puuid Player UUID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async FetchPlayer(puuid:string):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.get(this.Region.url.playerData + `/mmr/v1/players/${puuid}`);
    }
}

export { MMR };