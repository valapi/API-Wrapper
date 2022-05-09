import type { AxiosClient, ValWrapperAxios } from "../client/AxiosClient";
import type { ValorantAPIRegion } from "@valapi/lib";
declare class Session {
    protected AxiosClient: AxiosClient;
    protected Region: ValorantAPIRegion;
    /**
    * @param {AxiosClient} AxiosClient Services Data
    * @param {ValorantAPIRegion} Region Services Data
    */
    constructor(AxiosClient: AxiosClient, Region: ValorantAPIRegion);
    /**
    * @param {String} puuid Player UUID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    Get(puuid: string): Promise<ValWrapperAxios<any>>;
    /**
    * @param {String} puuid Player UUID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    ReConnect(puuid: string): Promise<ValWrapperAxios<any>>;
}
export { Session };
//# sourceMappingURL=Session.d.ts.map