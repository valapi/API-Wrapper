//import

import { type ValRequestClient, type ValRegion, QueueId } from "@valapi/lib";

//service

class Match {
    private RequestClient: ValRequestClient;
    private Region: ValRegion.Json;

    /**
     * 
     * @param {ValRequestClient} ValRequestClient Request Client
     * @param {ValRegion.Json} Region Region Service Data
     */
    public constructor(ValRequestClient: ValRequestClient, Region: ValRegion.Json) {
        this.RequestClient = ValRequestClient;
        this.Region = Region;
    }

    //PVP Endpoints

    /**
     * Get contract definitions
     * @param {string} matchId Match ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async FetchMatchDetails(matchId: string): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.get(`${this.Region.url.playerData}/match-details/v1/matches/${matchId}`);
    }

    /**
     * @param {string} puuid Player UUID
     * @param {string} queueId Queue
     * @param {number} startIndex Start Index (default: 0)
     * @param {number} endIndex End Index (default: 10)
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async FetchMatchHistory(puuid: string, queueId?: QueueId.String, startIndex = 0, endIndex = 10): Promise<ValRequestClient.Response<any>> {
        let _url = `${this.Region.url.playerData}/match-history/v1/history/${puuid}?startIndex=${String(startIndex)}&endIndex=${String(endIndex)}`;

        if (queueId) {
            _url += `&queue=${queueId}`;
        }

        return await this.RequestClient.get(_url);
    }
}

//export

export { Match };