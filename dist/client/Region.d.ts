import _Region from "../resources/Region";
import { Event as CustomEvent } from './Event';
interface ValWrapperRegion {
    data: {
        base: string;
        api: string;
        server: string;
    };
    url: {
        playerData: string;
        partyService: string;
        sharedData: string;
    };
}
/**
 * * Class ID: @ing3kth/val-api/ValRegion
 */
declare class Region extends CustomEvent {
    private base;
    private region;
    private server;
    /**
    * @param {String} region Region
    * @returns {IValRegion}
    */
    constructor(region?: keyof typeof _Region);
    /**
     *
     * @returns {ValWrapperRegion}
     */
    toJSON(): ValWrapperRegion;
    /**
     * @param {String} region Region
     * @returns {String}
     */
    static toString(region: keyof typeof _Region.data): keyof typeof _Region;
    /**
     * @param {String} region Region
     * @returns {ValWrapperRegion}
     */
    static fromString(region: keyof typeof _Region.data): ValWrapperRegion;
}
export { Region };
export type { ValWrapperRegion };
//# sourceMappingURL=Region.d.ts.map