//import
import { AxiosClient, type ValWrapperAxiosError, type ValWrapperAxios } from "../client/AxiosClient";
import { Event as CustomEvent } from "../client/Event";

import type { ValWrapperService } from "../client/Client";
import type { ValWrapperRegion } from "../client/Region";

import QueueId from "../resources/QueueId";

//service
class Player extends CustomEvent {
    protected AxiosClient:AxiosClient;
    protected Region:ValWrapperRegion;

    /**
    * @param {ValWrapperService} data Services Data
    */
    constructor(data:ValWrapperService) {
        super();
        
        this.AxiosClient = new AxiosClient(data.AxiosData);
        this.AxiosClient.on('error', ((data:ValWrapperAxiosError) => {
            this.emit('error', data);
        }));

        this.Region = data.Region;
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