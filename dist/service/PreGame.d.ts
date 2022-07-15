import type { ValRequestClient, ValorantApiRequestResponse } from "@valapi/lib";
import type { ValorantApiRegion } from "@valapi/lib";
declare class PreGame {
    protected RequestClient: ValRequestClient;
    protected Region: ValorantApiRegion;
    /**
    * @param {ValRequestClient} ValRequestClient Services Data
    * @param {ValorantApiRegion} Region Services Data
    */
    constructor(ValRequestClient: ValRequestClient, Region: ValorantApiRegion);
    /**
     * Class Constructor
     * @param {String} matchId Match ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    FetchChatToken(matchId: string): Promise<ValorantApiRequestResponse<any>>;
    /**
     * @param {String} matchId Match ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    FetchVoiceToken(matchId: string): Promise<ValorantApiRequestResponse<any>>;
    /**
     * @param {String} matchId Match ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    GetMatch(matchId: string): Promise<ValorantApiRequestResponse<any>>;
    /**
     * @param {String} matchId Match ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    GetMatchLoadouts(matchId: string): Promise<ValorantApiRequestResponse<any>>;
    /**
     * @param {String} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    GetPlayer(puuid: string): Promise<ValorantApiRequestResponse<any>>;
    /**
     * @param {String} matchId Match ID
     * @param {String} agentId Character ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    LockCharacter(matchId: string, agentId: string): Promise<ValorantApiRequestResponse<any>>;
    /**
     * * Careful to use, Riot will immediately shut down your Project.
     * @param {String} matchId Match ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    QuitMatch(matchId: string): Promise<ValorantApiRequestResponse<any>>;
    /**
     * @param {String} matchId Match ID
     * @param {String} agentId Character ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    SelectCharacter(matchId: string, agentId: string): Promise<ValorantApiRequestResponse<any>>;
}
export { PreGame };
