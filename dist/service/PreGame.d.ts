import type { AxiosClient, ValWrapperAxios } from "../client/AxiosClient";
import type { ValorantAPIRegion } from "@valapi/lib";
declare class PreGame {
    protected AxiosClient: AxiosClient;
    protected Region: ValorantAPIRegion;
    /**
    * @param {AxiosClient} AxiosClient Services Data
    * @param {ValorantAPIRegion} Region Services Data
    */
    constructor(AxiosClient: AxiosClient, Region: ValorantAPIRegion);
    /**
     * Class Constructor
     * @param {String} matchId Match ID
     * @returns {Promise<ValWrapperAxios<any>>}
     */
    FetchChatToken(matchId: string): Promise<ValWrapperAxios<any>>;
    /**
     * @param {String} matchId Match ID
     * @returns {Promise<ValWrapperAxios<any>>}
     */
    FetchVoiceToken(matchId: string): Promise<ValWrapperAxios<any>>;
    /**
     * @param {String} matchId Match ID
     * @returns {Promise<ValWrapperAxios<any>>}
     */
    GetMatch(matchId: string): Promise<ValWrapperAxios<any>>;
    /**
     * @param {String} matchId Match ID
     * @returns {Promise<ValWrapperAxios<any>>}
     */
    GetMatchLoadouts(matchId: string): Promise<ValWrapperAxios<any>>;
    /**
     * @param {String} puuid Player UUID
     * @returns {Promise<ValWrapperAxios<any>>}
     */
    GetPlayer(puuid: string): Promise<ValWrapperAxios<any>>;
    /**
     * @param {String} matchId Match ID
     * @param {String} agentId Character ID
     * @returns {Promise<ValWrapperAxios<any>>}
     */
    LockCharacter(matchId: string, agentId: string): Promise<ValWrapperAxios<any>>;
    /**
     * * Careful to use, Riot will immediately shut down your Project.
     * @param {String} matchId Match ID
     * @returns {Promise<ValWrapperAxios<any>>}
     */
    QuitMatch(matchId: string): Promise<ValWrapperAxios<any>>;
    /**
     * @param {String} matchId Match ID
     * @param {String} agentId Character ID
     * @returns {Promise<ValWrapperAxios<any>>}
     */
    SelectCharacter(matchId: string, agentId: string): Promise<ValWrapperAxios<any>>;
}
export { PreGame };
//# sourceMappingURL=PreGame.d.ts.map