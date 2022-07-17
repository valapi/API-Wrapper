//import

import type { ValRequestClient, ValorantApiRequestResponse } from "@valapi/lib";
import type { ValorantApiRegion } from "@valapi/lib";

import { QueueId } from "@valapi/lib";

//service

class MMR {
    private RequestClient: ValRequestClient;
    private Region: ValorantApiRegion;

    /**
     * Class Constructor
     * @param {ValRequestClient} ValRequestClient Request Client
     * @param {ValorantApiRegion} Region Region Service Data
     */
    public constructor(ValRequestClient: ValRequestClient, Region: ValorantApiRegion) {
        this.RequestClient = ValRequestClient;
        this.Region = Region;
    }

    /**
     * @param {string} puuid Player UUID
     * @param {string} queueId Queue
     * @param {number} startIndex Start Index (default: 0)
     * @param {number} endIndex End Index (default: 10)
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    public async FetchCompetitiveUpdates(puuid: string, queueId?: keyof typeof QueueId.from, startIndex: number = 0, endIndex: number = 10): Promise<ValorantApiRequestResponse<any>> {
        let _url = this.Region.url.playerData + `/mmr/v1/players/${puuid}/competitiveupdates?startIndex=${String(startIndex)}&endIndex=${String(endIndex)}`;

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
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    public async FetchLeaderboard(seasonId: string, startIndex: number = 0, size: number = 510, serachUsername?: string): Promise<ValorantApiRequestResponse<any>> {
        let _url = this.Region.url.playerData + `/mmr/v1/leaderboards/affinity/${this.Region.data.api}/queue/competitive/season/${seasonId}?startIndex=${startIndex}&size=${size}`;

        if (serachUsername) {
            _url += `&query=${serachUsername}`;
        }

        return await this.RequestClient.get(_url);
    }

    /**
     * @param {string} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    public async FetchPlayer(puuid: string): Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.get(this.Region.url.playerData + `/mmr/v1/players/${puuid}`);
    }

    // NOT IN DOCS //

    /**
     * @param {string} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    public async HideActRankBadge(puuid: string): Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.post(this.Region.url.playerData + `/mmr/v1/players/${puuid}/hideactrankbadge`);
    }
}

//export

export { MMR };