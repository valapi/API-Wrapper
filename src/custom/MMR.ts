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
    * @param {String} queueId Queue
    * @param {Number} startIndex Start Index
    * @param {Number} endIndex End Index
    * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async FetchCompetitiveUpdates(puuid:string, queueId?:keyof typeof QueueId, startIndex:number = 0, endIndex:number = 10):Promise<ValWrapperAxios<any>> {
        let _url = this.Region.url.playerData + `/mmr/v1/players/${puuid}/competitiveupdates?startIndex=${String(startIndex)}&endIndex=${String(endIndex)}`;

        if(queueId === 'data'){
            this.AxiosClient.emit('error', {
                errorCode: 'ValWrapper_Request_Error',
                message: 'Queue ID cannot be "data"',
                data: queueId,
            })
        }

        if (queueId) {
            _url += `&queue=${queueId}`;
        }

        return await this.AxiosClient.get(_url);
    }

    /**
    * @param {String} seasonId Season ID
    * @param {Number} startIndex Start Index
    * @param {Number} size Size
    * @param {String} serachUsername Search Username
    * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async FetchLeaderboard(seasonId:string, startIndex:number = 0, size:number = 510, serachUsername?:string):Promise<ValWrapperAxios<any>> {
        let _url = this.Region.url.playerData + `/mmr/v1/leaderboards/affinity/${this.Region.data.api}/queue/competitive/season/${seasonId}?startIndex=${startIndex}&size=${size}`;

        if(serachUsername){
            _url += `&query=${serachUsername}`;
        }

        return await this.AxiosClient.get(_url);
    }

    /**
    * @param {String} puuid Player UUID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async FetchPlayer(puuid:string):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.get(this.Region.url.playerData + `/mmr/v1/players/${puuid}`);
    }

    // NOT IN DOCS //

    /**
    * @param {String} puuid Player UUID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async HideActRankBadge(puuid:string):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.post(this.Region.url.playerData + `/mmr/v1/players/${puuid}/hideactrankbadge`);
    }
}

export { MMR };