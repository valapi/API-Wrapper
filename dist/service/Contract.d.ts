import type { AxiosClient, ValWrapperAxios } from "../client/AxiosClient";
import type { ValorantAPIRegion } from "@valapi/lib";
declare class Contract {
    protected AxiosClient: AxiosClient;
    protected Region: ValorantAPIRegion;
    /**
     * Class Constructor
     * @param {AxiosClient} AxiosClient Services Data
     * @param {ValorantAPIRegion} Region Services Data
     */
    constructor(AxiosClient: AxiosClient, Region: ValorantAPIRegion);
    /**
     * @returns {Promise<ValWrapperAxios<any>>}
     */
    DefinitionsFetch(): Promise<ValWrapperAxios<any>>;
    /**
     * @returns {Promise<ValWrapperAxios<any>>}
     */
    FetchActiveStory(): Promise<ValWrapperAxios<any>>;
    /**
     * @param {String} puuid Player UUID
     * @returns {Promise<ValWrapperAxios<any>>}
     */
    Fetch(puuid: string): Promise<ValWrapperAxios<any>>;
    /**
     * @param {String} puuid Player UUID
     * @param {String} contractId Contract ID
     * @returns {Promise<ValWrapperAxios<any>>}
     */
    Activate(puuid: string, contractId: string): Promise<ValWrapperAxios<any>>;
}
export { Contract };
//# sourceMappingURL=Contract.d.ts.map