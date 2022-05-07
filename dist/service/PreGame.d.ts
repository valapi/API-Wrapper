import { AxiosClient, type ValWrapperAxios } from "../client/AxiosClient";
import type { ValWrapperService } from "../client/Client";
import type { ValWrapperRegion } from "../client/Region";
declare class PreGame {
    AxiosClient: AxiosClient;
    protected Region: ValWrapperRegion;
    /**
    * @param {ValWrapperService} data Services Data
    */
    constructor(data: ValWrapperService);
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