//import
import type { AxiosClient, ValWrapperAxios } from "../client/AxiosClient";
import type { ValorantAPIRegion } from "@valapi/lib";

//service
class Player {
    protected AxiosClient:AxiosClient;
    protected Region:ValorantAPIRegion;

    private UserAgent:string;

    /**
     * Class Constructor
     * @param {AxiosClient} AxiosClient Services Data
     * @param {ValorantAPIRegion} Region Services Data
     */
    public constructor(AxiosClient:AxiosClient, Region:ValorantAPIRegion, UserAgent:string) {
        this.AxiosClient = AxiosClient;
        this.Region = Region;

        this.UserAgent = UserAgent;
    }

    //Mike - Username From ID
    
    /**
     * @param {String} puuid Player UUID
     * @returns {Promise<ValWrapperAxios<any>>}
     */
     public async GetUsername(puuid:string):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.put(this.Region.url.playerData + `/name-service/v2/players`, [
            `${puuid}`
        ]);
    }

    //Riot Auth

    /**
     * @returns {Promise<ValWrapperAxios<any>>}
     */
     public async GetUserInfo():Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.post(`https://auth.riotgames.com/userinfo`, {
            headers: {
                'User-Agent': this.UserAgent,
            },
        });
    }

    //PVP Endpoints

    /**
     * @param {String} puuid PlayerUUID
     * @returns {Promise<ValWrapperAxios<any>>}
     */
     public async AccountXP(puuid:string):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.get(this.Region.url.playerData + `/account-xp/v1/players/${puuid}`);
    }

    /**
     * @param {String} puuid PlayerUUID
     * @returns {Promise<ValWrapperAxios<any>>}
     */
     public async Loadout(puuid:string):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.get(this.Region.url.playerData + `/personalization/v2/players/${puuid}/playerloadout`);
    }

    /**
     * @param {String} puuid PlayerUUID
     * @returns {Promise<ValWrapperAxios<any>>}
     */
     public async LoadoutUpdate(puuid:string):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.put(this.Region.url.playerData + `/personalization/v2/players/${puuid}/playerloadout`);
    }

    /**
     * @returns {Promise<ValWrapperAxios<any>>}
     */
     public async FetchPlayerRestrictions():Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.get(this.Region.url.playerData + `/restrictions/v3/penalties`);
    }

    // NOT IN DOCS //

    /**
     * * IDK what this is
     * @param {String} puuid PlayerUUID
     * @returns {Promise<ValWrapperAxios<any>>}
     */
     public async MassRewards(puuid:string):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.post(this.Region.url.playerData + `/mass-rewards/v1/players/${puuid}/reconcile`);
    }
}

export { Player };