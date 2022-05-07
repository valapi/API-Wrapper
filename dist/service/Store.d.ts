import { AxiosClient, type ValWrapperAxios } from "../client/AxiosClient";
import type { ValWrapperService } from "../client/Client";
import type { ValWrapperRegion } from "../client/Region";
import ItemTypeId from "../resources/ItemTypeId";
declare class Store {
    AxiosClient: AxiosClient;
    protected Region: ValWrapperRegion;
    /**
    * @param {ValWrapperService} data Services Data
    */
    constructor(data: ValWrapperService);
    /**
    * @param {String} puuid Player UUID
    * @param {String} itemType Item Type
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    GetEntitlements(puuid: string, itemType: keyof typeof ItemTypeId.data): Promise<ValWrapperAxios<any>>;
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
}
export { Store };
//# sourceMappingURL=Store.d.ts.map