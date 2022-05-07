import { AxiosClient, type ValWrapperAxios } from "../client/AxiosClient";
import { CustomEvent } from "@valapi/lib";
import type { ValWrapperService } from "../client/Client";
import type { ValorantAPIRegion } from "@valapi/lib";
import { ItemTypeId } from "@valapi/lib";
declare class Store extends CustomEvent {
    protected AxiosClient: AxiosClient;
    protected Region: ValorantAPIRegion;
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