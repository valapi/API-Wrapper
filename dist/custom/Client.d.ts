import type { AxiosClient, ValWrapperAxios } from "../client/AxiosClient";
import type { ValorantAPIRegion } from "@valapi/lib";
declare class Client {
    protected AxiosClient: AxiosClient;
    protected Region: ValorantAPIRegion;
    /**
    * @param {AxiosClient} AxiosClient Services Data
    * @param {ValorantAPIRegion} Region Services Data
    */
    constructor(AxiosClient: AxiosClient, Region: ValorantAPIRegion);
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