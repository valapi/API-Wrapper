import type { ValRequestClient, ValRegion } from "@valapi/lib";
declare class CurrentGame {
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
    FetchAllChatMUCToken(matchId: string): Promise<ValRequestClient.Response<any>>;
    /**
     * @param {string} matchId Match ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    FetchMatch(matchId: string): Promise<ValRequestClient.Response<any>>;
    /**
     * @param {string} matchId Match ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    FetchMatchLoadouts(matchId: string): Promise<ValRequestClient.Response<any>>;
    /**
     * @param {string} puuid PlayerUUID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    FetchPlayer(puuid: string): Promise<ValRequestClient.Response<any>>;
    /**
     * @param {string} matchId Match ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    FetchTeamChatMUCToken(matchId: string): Promise<ValRequestClient.Response<any>>;
    /**
     * * Careful to use, Riot will immediately shut down your Project.
     * @param {string} puuid Player UUID
     * @param {string} matchId Match ID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    DisassociatePlayer(puuid: string, matchId: string): Promise<ValRequestClient.Response<any>>;
}
export { CurrentGame };
