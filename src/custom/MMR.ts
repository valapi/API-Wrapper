//import

import { type ValRequestClient, type ValRegion, QueueId } from "@valapi/lib";

//service

class MMR {
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

    /**
     * @param {string} puuid Player UUID
     * @param {string} queueId Queue
     * @param {number} startIndex Start Index (default: 0)
     * @param {number} endIndex End Index (default: 10)
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async FetchCompetitiveUpdates(puuid: string, queueId?: QueueId.String, startIndex = 0, endIndex = 10): Promise<ValRequestClient.Response<any>> {
        let _url = `${this.Region.url.playerData}/mmr/v1/players/${puuid}/competitiveupdates?startIndex=${String(startIndex)}&endIndex=${String(endIndex)}`;

        if (queueId) {
            _url += `&queue=${queueId}`;
        }

        return await this.RequestClient.get(_url);
    }

    /**
     * @param {string} seasonId Season ID
     * @param {number} startIndex Start Index (default: 0)
     * @param {number} size Size (default: 510)
     * @param {string} serachUsername Search Username
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async FetchLeaderboard(seasonId: string, startIndex = 0, size = 510, serachUsername?: string): Promise<ValRequestClient.Response<any>> {
        let _url = `${this.Region.url.playerData}/mmr/v1/leaderboards/affinity/${this.Region.data.api}/queue/competitive/season/${seasonId}?startIndex=${startIndex}&size=${size}`;

        if (serachUsername) {
            _url += `&query=${serachUsername}`;
        }

        return await this.RequestClient.get(_url);
    }

    /**
     * @param {string} puuid Player UUID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async FetchPlayer(puuid: string): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.get(`${this.Region.url.playerData}/mmr/v1/players/${puuid}`);
    }

    // NOT IN DOCS //

    /**
     * @param {string} puuid Player UUID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async HideActRankBadge(puuid: string): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.post(`${this.Region.url.playerData}/mmr/v1/players/${puuid}/hideactrankbadge`);
    }
}

//export

export { MMR };