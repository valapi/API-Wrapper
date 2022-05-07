import { AxiosClient, type ValWrapperAxios } from "../client/AxiosClient";
import type { ValWrapperService } from "../client/Client";
import type { ValWrapperRegion } from "../client/Region";
declare class Client {
    AxiosClient: AxiosClient;
    protected Region: ValWrapperRegion;
    /**
    * @param {ValWrapperService} data Services Data
    */
    constructor(data: ValWrapperService);
    /**
    * @param {String} puuid Player UUID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    GetSession(puuid: string): Promise<ValWrapperAxios<any>>;
    /**
     * @returns {Promise<ValWrapperAxios<any>>}
    */
    FetchContent(): Promise<ValWrapperAxios<any>>;
    /**
     * @returns {Promise<ValWrapperAxios<any>>}
    */
    FetchConfig(): Promise<ValWrapperAxios<any>>;
}
export { Client };
//# sourceMappingURL=Client.d.ts.map