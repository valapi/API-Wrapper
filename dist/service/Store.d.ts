import type { ValRequestClient, ValorantApiRequestResponse } from "@valapi/lib";
import type { ValorantApiRegion } from "@valapi/lib";
import { ItemTypeId } from "@valapi/lib";
declare class Store {
    private RequestClient;
    private Region;
    /**
     * Class Constructor
     * @param {ValRequestClient} ValRequestClient Services Data
     * @param {ValorantApiRegion} Region Services Data
     */
    constructor(ValRequestClient: ValRequestClient, Region: ValorantApiRegion);
    /**
     * @param {string} puuid Player UUID
     * @param {string} itemTypeId Item Type
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    GetEntitlements(puuid: string, itemTypeId: keyof typeof ItemTypeId.from): Promise<ValorantApiRequestResponse<any>>;
    /**
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    GetOffers(): Promise<ValorantApiRequestResponse<any>>;
    /**
     * @param {string} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    GetStorefront(puuid: string): Promise<ValorantApiRequestResponse<any>>;
    /**
     * @param {string} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    GetWallet(puuid: string): Promise<ValorantApiRequestResponse<any>>;
    /**
     * * NOT TESTED
     * @param {string} puuid Player UUID
     * @returns {Promise<ValorantApiRequestResponse<any>>}
     */
    RevealNightMarketOffers(puuid: string): Promise<ValorantApiRequestResponse<any>>;
}
export { Store };
