//import
import type { AxiosClient, ValWrapperAxios } from "../client/AxiosClient";
import type { ValorantAPIRegion } from "@valapi/lib";

import { QueueId } from "@valapi/lib";

//interface
type ValWrapperSetAccessibility = 'OPEN' | 'CLOSED'

interface ValWrapperCustomGameSettings {
	"Map": string;
	"Mode": string;
	"UseBots": boolean;
	"GamePod": string;
	"GameRules": {
		"AllowGameModifiers": boolean;
		"PlayOutAllRounds": boolean;
		"SkipMatchHistory": boolean;
		"TournamentMode": boolean;
		"IsOvertimeWinByTwo": boolean;
	};
}

//service
class Party {
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

    /**
     * 
     * @param {String} puuid Player UUID
     * @returns {Promise<ValWrapperAxios<any>>}
     */
     public async RemovePlayer(puuid:string):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.delete(this.Region.url.partyService + `/parties/v1/players/${puuid}`);
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
     public async FetchMUCToken(partyId:string):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.get(this.Region.url.partyService + `/parties/v1/parties/${partyId}/muctoken`);
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
    * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async FetchVoiceToken(partyId:string):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.get(this.Region.url.partyService + `/parties/v1/parties/${partyId}/voicetoken`);
    }

    /**
    * @param {String} partyId Party ID
    * @param {String} queue Queue (EligibleQueues)
    * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async ChangeQueue(partyId:string, queue:keyof typeof QueueId.data):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.post(this.Region.url.partyService + `/parties/v1/parties/${partyId}/queue`, {
            "queueID": `${QueueId.data[queue]}`
        });
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
    * @param {String} puuid Player UUID
    * @param {String} partyId Party ID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async RefreshCompetitiveTier(puuid:string, partyId:string):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.post(this.Region.url.partyService + `/parties/v1/parties/${puuid}/members/${partyId}/refreshCompetitiveTier`);
    }

    /**
    * @param {String} puuid Player UUID
    * @param {String} partyId Party ID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async RefreshPings(puuid:string, partyId:string):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.post(this.Region.url.partyService + `/parties/v1/parties/${puuid}/members/${partyId}/refreshPings`);
    }

    /**
    * @param {String} puuid Player UUID
    * @param {String} partyId Party ID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async RefreshPlayerIdentity(puuid:string, partyId:string):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.post(this.Region.url.partyService + `/parties/v1/parties/${puuid}/members/${partyId}/refreshPlayerIdentity`);
    }

    /**
    * @param {String} partyId Party ID
    * @param {String} accessibility Accessibility
    * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async SetAccessibility(partyId:string, accessibility:ValWrapperSetAccessibility):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.post(this.Region.url.partyService + `/parties/v1/parties/${partyId}/accessibility`, {
            "accessibility": `${accessibility}`
        });
    }

    /**
    * @param {String} partyId Party ID
    * @param {CustomGame_Settings} settings Custom Game Settings
    * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async SetCustomGameSettings(partyId:string, settings:ValWrapperCustomGameSettings):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.post(this.Region.url.partyService + `/parties/v1/parties/${partyId}/customgamesettings`, settings);
    }

    /**
    * @param {String} puuid Player UUID
    * @param {String} partyId Party ID
    * @param {boolean} ready Ready or not?
    * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async SetMemberReady(puuid:string, partyId:string, ready:boolean):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.post(this.Region.url.partyService + `/parties/v1/parties/${puuid}/members/${partyId}/setReady`, {
            "ready": ready
        });
    }

    /**
    * @param {String} partyId Party ID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async StartCustomGame(partyId:string):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.post(this.Region.url.partyService + `/parties/v1/parties/${partyId}/startcustomgame`);
    }

    // NOT IN DOCS //

    /**
    * @param {String} puuid Player UUID
    * @param {String} partyId Party ID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
     public async LeaveParty(puuid:string, partyId:string):Promise<ValWrapperAxios<any>> {
        return await this.AxiosClient.post(this.Region.url.partyService + `/parties/v1/players/${puuid}/leaveparty/${partyId}`);
    }
}

export { Party };
export type { ValWrapperSetAccessibility, ValWrapperCustomGameSettings };