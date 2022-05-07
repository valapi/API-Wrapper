//import
import { AxiosClient, type ValWrapperAxiosError, type ValWrapperAxios } from "../client/AxiosClient";
import { Event as CustomEvent } from "../client/Event";

import type { ValWrapperService } from "../client/Client";
import type { ValWrapperRegion } from "../client/Region";

import QueueId from "../resources/QueueId";

//interface
type Party_SetAccessibility_accessibility = 'OPEN' | 'CLOSED'

//service
class Party extends CustomEvent {
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

    /**
     * @returns {Promise<ValWrapperAxios<any>>}
     */
     public async FetchCustomGameConfigs():Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.get(this.Region.url.partyService + `/parties/v1/parties/customgameconfigs`);
    }

    /**
    * @param {String} partyId Party ID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async FetchParty(partyId:string):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.get(this.Region.url.partyService + `/parties/v1/parties/${partyId}`);
    }

    /**
    * @param {String} puuid Player UUID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async FetchPlayer(puuid:string):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.get(this.Region.url.partyService + `/parties/v1/players/${puuid}`);
    }

    /**
    * @param {String} partyId Party ID
    * @param {String} queue Queue
    * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async ChangeQueue(partyId:string, queue:keyof typeof QueueId.data):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.post(this.Region.url.partyService + `/parties/v1/parties/${partyId}/queue`, {
            "queueID": `${QueueId.data[queue]}`
        });
    }

    /**
    * @param {String} partyId Party ID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async EnterMatchmakingQueue(partyId:string):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.post(this.Region.url.partyService + `/parties/v1/parties/${partyId}/matchmaking/join`);
    }

    /**
    * @param {String} partyId Party ID
    * @param {String} gameName In-Game Name
    * @param {String} tagLine In-Game Tag
    * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async InviteToPartyByDisplayName(partyId:string, gameName:string, tagLine:string):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.post(this.Region.url.partyService + `/parties/v1/parties/${partyId}/invites/name/${gameName}/tag/${tagLine}`);
    }

    /**
    * @param {String} partyId Party ID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async LeaveMatchmakingQueue(partyId:string):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.post(this.Region.url.partyService + `/parties/v1/parties/${partyId}/matchmaking/leave`);
    }

    /**
    * @param {String} partyId Party ID
    * @param {String} accessibility Accessibility
    * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async SetAccessibility(partyId:string, accessibility:Party_SetAccessibility_accessibility):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.post(this.Region.url.partyService + `/parties/v1/parties/${partyId}/accessibility`, {
            "accessibility": `${accessibility}`
        });
    }
    
    /**
    * @param {String} partyId Party ID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async StartCustomGame(partyId:string):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.post(this.Region.url.partyService + `/parties/v1/parties/${partyId}/startcustomgame`);
    }

    /**
     * 
     * @param {String} puuid Player UUID
     * @returns {Promise<ValWrapperAxios<any>>}
     */
     public async RemovePlayer(puuid:string):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.delete(this.Region.url.partyService + `/parties/v1/players/${puuid}`);
    }

    /**
     * @param {String} partyId Party ID
     * @param {String} requestId Request ID
     * @returns {Promise<ValWrapperAxios<any>>}
     */
     public async DeclineRequest(partyId:string, requestId:string):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.post(this.Region.url.partyService + `/parties/v1/parties/${partyId}/request/${requestId}/decline`);
    }

    /**
    * @param {String} puuid Player UUID
    * @param {String} partyId Party ID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async LeaveParty(puuid:string, partyId:string):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.post(this.Region.url.partyService + `/parties/v1/players/${puuid}/leaveparty/${partyId}`);
    }

    /**
    * @param {String} partyId Party ID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async LeaveQueue(partyId:string):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.post(this.Region.url.partyService + `/parties/v1/parties/${partyId}/matchmaking/leave`);
    }
}

export { Party };
export type { Party_SetAccessibility_accessibility };