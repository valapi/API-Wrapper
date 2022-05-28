import type { ValRequestClient, ValorantApiRequestResponse } from "@valapi/lib";
import type { ValorantApiRegion } from "@valapi/lib";
declare class CurrentGame {
    protected RequestClient: ValRequestClient;
    protected Region: ValorantApiRegion;
    /**
     * Class Constructor
     * @param {ValRequestClient} ValRequestClient Services Data
     * @param {ValorantApiRegion} Region Services Data
     */
    constructor(ValRequestClient: ValRequestClient, Region: ValorantApiRegion);
    /**
     * @param {String} matchId Match ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    FetchAllChatMUCToken(matchId: string): Promise<ValorantApiRequestResponse<any>>;
    /**
     * @param {String} matchId Match ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    FetchMatch(matchId: string): Promise<ValorantApiRequestResponse<any>>;
    /**
     * @param {String} matchId Match ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    FetchMatchLoadouts(matchId: string): Promise<ValorantApiRequestResponse<any>>;
    /**
     * @param {String} puuid PlayerUUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    FetchPlayer(puuid: string): Promise<ValorantApiRequestResponse<any>>;
    /**
     * @param {String} matchId Match ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    FetchTeamChatMUCToken(matchId: string): Promise<ValorantApiRequestResponse<any>>;
    /**
     * * Careful to use, Riot will immediately shut down your Project.
     * @param {String} puuid Player UUID
     * @param {String} matchId Match ID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    DisassociatePlayer(puuid: string, matchId: string): Promise<ValorantApiRequestResponse<any>>;
}
export { CurrentGame };
//# sourceMappingURL=CurrentGame.d.ts.map