import type { AxiosClient, ValWrapperAxios } from "../client/AxiosClient";
import type { ValorantAPIRegion } from "@valapi/lib";
import { ItemTypeId } from "@valapi/lib";
declare class Store {
    protected AxiosClient: AxiosClient;
    protected Region: ValorantAPIRegion;
    /**
    * @param {AxiosClient} AxiosClient Services Data
    * @param {ValorantAPIRegion} Region Services Data
    */
    constructor(AxiosClient: AxiosClient, Region: ValorantAPIRegion);
    /**
    * @param {String} puuid Player UUID
    * @param {String} itemTypeId Item Type
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    GetEntitlements(puuid: string, itemTypeId: keyof typeof ItemTypeId): Promise<ValWrapperAxios<any>>;
    /**
     * @returns {Promise<ValWrapperAxios<any>>}
    */
    GetOffers(): Promise<ValWrapperAxios<any>>;
    /**
    * @param {String} puuid Player UUID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    GetStorefront(puuid: string): Promise<ValWrapperAxios<any>>;
    /**
    * @param {String} puuid Player UUID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    GetWallet(puuid: string): Promise<ValWrapperAxios<any>>;
    /**
     * * NOT TESTED
    * @param {String} puuid Player UUID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    RevealNightMarketOffers(puuid: string): Promise<ValWrapperAxios<any>>;
}
export { Store };
//# sourceMappingURL=Store.d.ts.map