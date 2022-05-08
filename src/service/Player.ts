//import
import type { AxiosClient, ValWrapperAxios } from "../client/AxiosClient";
import type { ValorantAPIRegion } from "@valapi/lib";

import { QueueId } from "@valapi/lib";

//service
class Player {
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
        return await this.AxiosClient.post(`https://auth.riotgames.com/userinfo`);
    }

    //PVP Endpoints

    /**
    * @param {String} puuid Player UUID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async FetchPlayer(puuid:string):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.get(this.Region.url.playerData + `/mmr/v1/players/${puuid}`);
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
     public async AccountXP(puuid:string):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.get(this.Region.url.playerData + `/account-xp/v1/players/${puuid}`);
    }

    /**
     * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async FetchPlayerRestrictions():Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.get(this.Region.url.playerData + `/restrictions/v3/penalties`);
    }
}

export { Player };