//import

import type { ValRequestClient, ValRegion } from "@valapi/lib";

//service

class Player {
    private RequestClient: ValRequestClient;
    private Region: ValRegion.Json;

    private UserAgent: string;

    /**
     * 
     * @param {ValRequestClient} ValRequestClient Request Client
     * @param {ValRegion.Json} Region Region Service Data
     * @param {string} UserAgent Request User Agent
     */
    public constructor(ValRequestClient: ValRequestClient, Region: ValRegion.Json, UserAgent: string) {
        this.RequestClient = ValRequestClient;
        this.Region = Region;

        this.UserAgent = UserAgent;
    }

    //Mike - Username From ID

    /**
     * @param {string} puuid Player UUID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async GetUsername(puuid: string): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.put(`${this.Region.url.playerData}/name-service/v2/players`, [
            `${puuid}`
        ]);
    }

    //Riot Auth

    /**
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async GetUserInfo(): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.post(`https://auth.riotgames.com/userinfo`, {
            headers: {
                'User-Agent': this.UserAgent,
            },
        });
    }

    //PVP Endpoints

    /**
     * @param {string} puuid PlayerUUID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async AccountXP(puuid: string): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.get(`${this.Region.url.playerData}/account-xp/v1/players/${puuid}`);
    }

    /**
     * @param {string} puuid PlayerUUID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async Loadout(puuid: string): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.get(`${this.Region.url.playerData}/personalization/v2/players/${puuid}/playerloadout`);
    }

    /**
     * @param {string} puuid PlayerUUID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async LoadoutUpdate(puuid: string): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.put(`${this.Region.url.playerData}/personalization/v2/players/${puuid}/playerloadout`);
    }

    /**
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async FetchPlayerRestrictions(): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.get(`${this.Region.url.playerData}/restrictions/v3/penalties`);
    }

    // NOT IN DOCS //

    /**
     * @param {string} puuid PlayerUUID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    public async MassRewards(puuid: string): Promise<ValRequestClient.Response<any>> {
        return await this.RequestClient.post(`${this.Region.url.playerData}/mass-rewards/v1/players/${puuid}/reconcile`);
    }
}

//export

export { Player };