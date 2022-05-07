import { AxiosClient, type ValWrapperAxios } from "../client/AxiosClient";
import type { ValWrapperService } from "../client/Client";
import type { ValWrapperRegion } from "../client/Region";
declare class Contract {
    AxiosClient: AxiosClient;
    protected Region: ValWrapperRegion;
    /**
    * @param {ValWrapperService} data Services Data
    */
    constructor(data: ValWrapperService);
    /**
     * @returns {Promise<ValWrapperAxios<any>>}
    */
    DefinitionsFetch(): Promise<ValWrapperAxios<any>>;
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