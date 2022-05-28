//import
import type { ValRequestClient, ValorantApiRequestResponse } from "@valapi/lib";
import type { ValorantApiRegion } from "@valapi/lib";

//service
class Player {
    protected RequestClient:ValRequestClient;
    protected Region:ValorantApiRegion;

    private UserAgent:string;

    /**
     * Class Constructor
     * @param {AxiosClient} AxiosClient Services Data
     * @param {ValorantApiRegion} Region Services Data
     */
    public constructor(AxiosClient:ValRequestClient, Region:ValorantApiRegion, UserAgent:string) {
        this.RequestClient = AxiosClient;
        this.Region = Region;

        this.UserAgent = UserAgent;
    }

    //Mike - Username From ID
    
    /**
     * @param {String} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
     public async GetUsername(puuid:string):Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.put(this.Region.url.playerData + `/name-service/v2/players`, [
            `${puuid}`
        ]);
    }

    //Riot Auth

    /**
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
     public async GetUserInfo():Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.post(`https://auth.riotgames.com/userinfo`, {
            headers: {
                'User-Agent': this.UserAgent,
            },
        });
    }

    //PVP Endpoints

    /**
     * @param {String} puuid PlayerUUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
     public async AccountXP(puuid:string):Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.get(this.Region.url.playerData + `/account-xp/v1/players/${puuid}`);
    }

    /**
     * @param {String} puuid PlayerUUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
     public async Loadout(puuid:string):Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.get(this.Region.url.playerData + `/personalization/v2/players/${puuid}/playerloadout`);
    }

    /**
     * @param {String} puuid PlayerUUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
     public async LoadoutUpdate(puuid:string):Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.put(this.Region.url.playerData + `/personalization/v2/players/${puuid}/playerloadout`);
    }

    /**
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
     public async FetchPlayerRestrictions():Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.get(this.Region.url.playerData + `/restrictions/v3/penalties`);
    }

    // NOT IN DOCS //

    /**
     * * IDK what this is
     * @param {String} puuid PlayerUUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
     public async MassRewards(puuid:string):Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.post(this.Region.url.playerData + `/mass-rewards/v1/players/${puuid}/reconcile`);
    }
}

export { Player };