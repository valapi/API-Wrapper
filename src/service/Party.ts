//import
import type { ValRequestClient, ValorantApiRequestResponse } from "@valapi/lib";
import type { ValorantApiRegion } from "@valapi/lib";

import { QueueId } from "@valapi/lib";

//interface
type ValWrapperSetAccessibility = 'OPEN' | 'CLOSED';

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

type ValWrapperCustomGameTeam = 'TeamTwo' | 'TeamOne' | 'TeamSpectate' | 'TeamOneCoaches' | 'TeamTwoCoaches';

//service

class Party {
    protected RequestClient:ValRequestClient;
    protected Region:ValorantApiRegion;

    /**
     * Class Constructor
     * @param {ValRequestClient} ValRequestClient Services Data
     * @param {ValorantApiRegion} Region Services Data
     */
    public constructor(ValRequestClient:ValRequestClient, Region:ValorantApiRegion) {
        this.RequestClient = ValRequestClient;
        this.Region = Region;
    }

    /**
     * 
     * @param {String} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
     public async RemovePlayer(puuid:string):Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.delete(this.Region.url.partyService + `/parties/v1/players/${puuid}`);
    }

    /**
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
     public async FetchCustomGameConfigs():Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.get(this.Region.url.partyService + `/parties/v1/parties/customgameconfigs`);
    }

    /**
     * @param {String} partyId Party ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
     public async FetchMUCToken(partyId:string):Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.get(this.Region.url.partyService + `/parties/v1/parties/${partyId}/muctoken`);
    }

    /**
     * @param {String} partyId Party ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
     public async FetchParty(partyId:string):Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.get(this.Region.url.partyService + `/parties/v1/parties/${partyId}`);
    }

    /**
     * @param {String} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
     public async FetchPlayer(puuid:string):Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.get(this.Region.url.partyService + `/parties/v1/players/${puuid}`);
    }

    /**
     * @param {String} partyId Party ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
     public async FetchVoiceToken(partyId:string):Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.get(this.Region.url.partyService + `/parties/v1/parties/${partyId}/voicetoken`);
    }

    /**
     * @param {String} partyId Party ID
     * @param {String} queueId Queue (EligibleQueues)
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
     public async ChangeQueue(partyId:string, queueId:keyof typeof QueueId.from):Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.post(this.Region.url.partyService + `/parties/v1/parties/${partyId}/queue`, {
            "queueID": String(queueId)
        });
    }

    /**
     * @param {String} partyId Party ID
     * @param {String} requestId Request ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
     public async DeclineRequest(partyId:string, requestId:string):Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.post(this.Region.url.partyService + `/parties/v1/parties/${partyId}/request/${requestId}/decline`);
    }

    /**
     * @param {String} partyId Party ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
     public async EnterMatchmakingQueue(partyId:string):Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.post(this.Region.url.partyService + `/parties/v1/parties/${partyId}/matchmaking/join`);
    }

    /**
     * @param {String} partyId Party ID
     * @param {String} gameName In-Game Name
     * @param {String} tagLine In-Game Tag
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
     public async InviteToPartyByDisplayName(partyId:string, gameName:string, tagLine:string):Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.post(this.Region.url.partyService + `/parties/v1/parties/${partyId}/invites/name/${gameName}/tag/${tagLine}`);
    }

    /**
     * @param {String} partyId Party ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
     public async LeaveMatchmakingQueue(partyId:string):Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.post(this.Region.url.partyService + `/parties/v1/parties/${partyId}/matchmaking/leave`);
    }

    /**
     * @param {String} puuid Player UUID
     * @param {String} partyId Party ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
     public async RefreshCompetitiveTier(puuid:string, partyId:string):Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.post(this.Region.url.partyService + `/parties/v1/parties/${puuid}/members/${partyId}/refreshCompetitiveTier`);
    }

    /**
     * @param {String} puuid Player UUID
     * @param {String} partyId Party ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
     public async RefreshPings(puuid:string, partyId:string):Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.post(this.Region.url.partyService + `/parties/v1/parties/${puuid}/members/${partyId}/refreshPings`);
    }

    /**
     * @param {String} puuid Player UUID
     * @param {String} partyId Party ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
     public async RefreshPlayerIdentity(puuid:string, partyId:string):Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.post(this.Region.url.partyService + `/parties/v1/parties/${puuid}/members/${partyId}/refreshPlayerIdentity`);
    }

    /**
     * @param {String} partyId Party ID
     * @param {String} accessibility Accessibility
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
     public async SetAccessibility(partyId:string, accessibility:ValWrapperSetAccessibility):Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.post(this.Region.url.partyService + `/parties/v1/parties/${partyId}/accessibility`, {
            "accessibility": `${accessibility}`
        });
    }

    /**
     * @param {String} partyId Party ID
     * @param {CustomGame_Settings} settings Custom Game Settings
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
     public async SetCustomGameSettings(partyId:string, settings:ValWrapperCustomGameSettings):Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.post(this.Region.url.partyService + `/parties/v1/parties/${partyId}/customgamesettings`, settings);
    }

    /**
     * @param {String} puuid Player UUID
     * @param {String} partyId Party ID
     * @param {boolean} isReady Ready or not?
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
     public async SetMemberReady(puuid:string, partyId:string, isReady:boolean):Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.post(this.Region.url.partyService + `/parties/v1/parties/${puuid}/members/${partyId}/setReady`, {
            "ready": isReady
        });
    }

    /**
     * @param {String} partyId Party ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
     public async StartCustomGame(partyId:string):Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.post(this.Region.url.partyService + `/parties/v1/parties/${partyId}/startcustomgame`);
    }

    // NOT IN DOCS //

    /**
     * @param {String} puuid Player UUID
     * @param {String} partyId Party ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
     public async LeaveParty(puuid:string, partyId:string):Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.post(this.Region.url.partyService + `/parties/v1/players/${puuid}/leaveparty/${partyId}`);
    }

    /**
     * @param {String} partyId Party ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
     public async AutoBalance(partyId:string):Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.post(this.Region.url.partyService + `/parties/v1/parties/${partyId}/balance`);
    }

    /**
     * @param {String} partyId Party ID
     * @param {String} team Team
     * @param {String} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
     public async ChangeTeamInCustomGame(partyId:string, team:ValWrapperCustomGameTeam, puuid:string):Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.post(this.Region.url.partyService + `/parties/v1/parties/${partyId}/customgamemembership/${team}`, {
            "playerToPutOnTeam": String(puuid),
        });
    }

    /**
     * * Careful to use, Riot will immediately shut down your Project.
     * @param {String} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
     public async StartSoloExperience(puuid:string):Promise<ValorantApiRequestResponse<any>> {
        return await this.RequestClient.post(this.Region.url.partyService + `/parties/v1/players/${puuid}/startsoloexperience`);
    }
}

export { Party };
export type { ValWrapperSetAccessibility, ValWrapperCustomGameSettings, ValWrapperCustomGameTeam };