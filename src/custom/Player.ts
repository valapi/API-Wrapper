//import

import type { ValRequestClient, ValorantApiRequestResponse } from "@valapi/lib";
import type { ValorantApiRegion } from "@valapi/lib";

//service

class Player {
    private RequestClient: ValRequestClient;
    private Region: ValorantApiRegion;

    private UserAgent: string;

    /**
     * Class Constructor
     * @param {ValRequestClient} ValRequestClient Request Client
     * @param {ValorantApiRegion} Region Region Service Data
     * @param {string} UserAgent Request User Agent
     */
    public constructor(ValRequestClient: ValRequestClient, Region: ValorantApiRegion, UserAgent: string) {
        this.RequestClient = ValRequestClient;
        this.Region = Region;

        this.UserAgent = UserAgent;
    }

    //Mike - Username From ID

    /**
     * @param {string} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    public async GetUsername(puuid: string): Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.put(this.Region.url.playerData + `/name-service/v2/players`, [
            `${puuid}`
        ]);
    }

    //Riot Auth

    /**
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    public async GetUserInfo(): Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.post(`https://auth.riotgames.com/userinfo`, {
            headers: {
                'User-Agent': this.UserAgent,
            },
        });
    }

    //PVP Endpoints

    /**
     * @param {string} puuid PlayerUUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    public async AccountXP(puuid: string): Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.get(this.Region.url.playerData + `/account-xp/v1/players/${puuid}`);
    }

    /**
     * @param {string} puuid PlayerUUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    public async Loadout(puuid: string): Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.get(this.Region.url.playerData + `/personalization/v2/players/${puuid}/playerloadout`);
    }

    /**
     * @param {string} puuid PlayerUUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    public async LoadoutUpdate(puuid: string): Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.put(this.Region.url.playerData + `/personalization/v2/players/${puuid}/playerloadout`);
    }

    /**
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    public async FetchPlayerRestrictions(): Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.get(this.Region.url.playerData + `/restrictions/v3/penalties`);
    }

    // NOT IN DOCS //

    /**
     * @param {string} puuid PlayerUUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    public async MassRewards(puuid: string): Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.post(this.Region.url.playerData + `/mass-rewards/v1/players/${puuid}/reconcile`);
    }
}

//export

export { Player };