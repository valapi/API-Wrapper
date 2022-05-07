import { AxiosClient, type ValWrapperAxios } from "../client/AxiosClient";
import { CustomEvent } from "@valapi/lib";
import type { ValWrapperService } from "../client/Client";
import type { ValorantAPIRegion } from "@valapi/lib";
declare class CurrentGame extends CustomEvent {
    protected AxiosClient: AxiosClient;
    protected Region: ValorantAPIRegion;
    /**
    * @param {ValWrapperService} data Services Data
    */
    constructor(data: ValWrapperService);
    /**
    * @param {String} matchId Match ID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    FetchMatch(matchId: string): Promise<ValWrapperAxios<any>>;
    /**
    * @param {String} matchId Match ID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    FetchMatchLoadouts(matchId: string): Promise<ValWrapperAxios<any>>;
    /**
    * @param {String} puuid PlayerUUID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    FetchPlayer(puuid: string): Promise<ValWrapperAxios<any>>;
    /**
    * * Careful to use, Riot will immediately shut down your Project.
    * @param {String} puuid Player UUID
    * @param {String} matchId Match ID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    DisassociatePlayer(puuid: string, matchId: string): Promise<ValWrapperAxios<any>>;
}
export { CurrentGame };
//# sourceMappingURL=CurrentGame.d.ts.map