//import
import type { ValRequestClient, ValorantApiRequestResponse } from "@valapi/lib";
import type { ValorantApiRegion } from "@valapi/lib";

import { QueueId } from "@valapi/lib";

//service
class Match {
    protected RequestClient:ValRequestClient;
    protected Region:ValorantApiRegion;

    /**
     * Class Constructor
     * @param {AxiosClient} AxiosClient Services Data
     * @param {ValorantApiRegion} Region Services Data
     */
    public constructor(AxiosClient:ValRequestClient, Region:ValorantApiRegion) {
        this.RequestClient = AxiosClient;
        this.Region = Region;
    }

    //PVP Endpoints

    /**
     * Get contract definitions
     * @param {String} matchId Match ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
     public async FetchMatchDetails(matchId:string):Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.get(this.Region.url.playerData + `/match-details/v1/matches/${matchId}`);
    }

    /**
     * @param {String} puuid Player UUID
     * @param {String} queueId Queue
     * @param {Number} startIndex Start Index
     * @param {Number} endIndex End Index
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
     public async FetchMatchHistory(puuid:string, queueId?:keyof typeof QueueId.from, startIndex:number = 0, endIndex:number = 10):Promise<ValorantApiRequestResponse<any>> {
        let _url = this.Region.url.playerData + `/match-history/v1/history/${puuid}?startIndex=${String(startIndex)}&endIndex=${String(endIndex)}` ;

        if(queueId) {
            _url += `&queue=${queueId}`;
        }

        return await this.RequestClient.get(_url);
    }
}

export { Match };