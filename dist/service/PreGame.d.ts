import type { ValRequestClient, ValRegion } from "@valapi/lib";
declare class PreGame {
    private RequestClient;
    private Region;
    /**
     *
     * @param {ValRequestClient} ValRequestClient Request Client
     * @param {ValRegion.Json} Region Region Service Data
     */
    constructor(ValRequestClient: ValRequestClient, Region: ValRegion.Json);
    /**
     * @param {string} matchId Match ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    FetchChatToken(matchId: string): Promise<ValRequestClient.Response<any>>;
    /**
     * @param {string} matchId Match ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    FetchVoiceToken(matchId: string): Promise<ValRequestClient.Response<any>>;
    /**
     * @param {string} matchId Match ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    GetMatch(matchId: string): Promise<ValRequestClient.Response<any>>;
    /**
     * @param {string} matchId Match ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    GetMatchLoadouts(matchId: string): Promise<ValRequestClient.Response<any>>;
    /**
     * @param {string} puuid Player UUID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    GetPlayer(puuid: string): Promise<ValRequestClient.Response<any>>;
    /**
     * * Careful to use, Riot will immediately shut down your Project.
     * @param {string} matchId Match ID
     * @param {string} agentId Character ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    LockCharacter(matchId: string, agentId: string): Promise<ValRequestClient.Response<any>>;
    /**
     * * Careful to use, Riot will immediately shut down your Project.
     * @param {string} matchId Match ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    QuitMatch(matchId: string): Promise<ValRequestClient.Response<any>>;
    /**
     * * Careful to use, Riot will immediately shut down your Project.
     * @param {string} matchId Match ID
     * @param {string} agentId Character ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    SelectCharacter(matchId: string, agentId: string): Promise<ValRequestClient.Response<any>>;
}
export { PreGame };
