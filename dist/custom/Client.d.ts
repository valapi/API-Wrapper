import type { ValRequestClient, ValorantApiRequestResponse } from "@valapi/lib";
import type { ValorantApiRegion } from "@valapi/lib";
declare class Client {
    protected RequestClient: ValRequestClient;
    protected Region: ValorantApiRegion;
    /**
     * Class Constructor
     * @param {AxiosClient} AxiosClient Services Data
     * @param {ValorantApiRegion} Region Services Data
     */
    constructor(AxiosClient: ValRequestClient, Region: ValorantApiRegion);
    /**
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    FetchContent(): Promise<ValorantApiRequestResponse<any>>;
    /**
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    FetchConfig(): Promise<ValorantApiRequestResponse<any>>;
}
export { Client };
//# sourceMappingURL=Client.d.ts.map