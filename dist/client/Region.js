"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Region = void 0;
//import
const Region_1 = __importDefault(require("../resources/Region"));
const Event_1 = require("./Event");
//class
/**
 * * Class ID: @ing3kth/val-api/ValRegion
 */
class Region extends Event_1.Event {
    /**
    * @param {String} region Region
    * @returns {IValRegion}
    */
    constructor(region = 'na') {
        super();
        this.base = region;
        if (!Region_1.default[region] || region === 'data') {
            throw new Error(`Region '${String(this.base)}' not found`);
        }
        switch (region) {
            case 'na':
                this.region = 'na';
                this.server = 'na';
                break;
            case 'latam':
                this.region = 'latam';
                this.server = 'na';
                break;
            case 'br':
                this.region = 'br';
                this.server = 'na';
                break;
            case 'pbe':
                this.region = 'na';
                this.server = 'pbe';
                break;
            case 'eu':
                this.region = 'eu';
                this.server = 'eu';
                break;
            case 'kr':
                this.region = 'kr';
                this.server = 'kr';
                break;
            case 'ap':
                this.region = 'ap';
                this.server = 'ap';
                break;
            default:
                return new Region('na');
        }
    }
    /**
     *
     * @returns {ValWrapperRegion}
     */
    toJSON() {
        return {
            data: {
                base: this.base,
                api: this.region,
                server: this.server,
            },
            url: {
                playerData: `https://pd.${this.server}.a.pvp.net`,
                partyService: `https://glz-${this.region}-1.${this.server}.a.pvp.net`,
                sharedData: `https://shared.${this.server}.a.pvp.net`,
            }
        };
    }
    /**
     * @param {String} region Region
     * @returns {String}
     */
    static toString(region) {
        return Region_1.default.data[region];
    }
    /**
     * @param {String} region Region
     * @returns {ValWrapperRegion}
     */
    static fromString(region) {
        const _region = new Region(Region.toString(region));
        return _region.toJSON();
    }
}
exports.Region = Region;
//# sourceMappingURL=Region.js.map