//import
import _Region from "../resources/Region";
import { Event as CustomEvent } from './Event';

//interface

interface ValWrapperRegion {
    data: {
        base: string,
        api: string,
        server: string,
    },
    url: {
        playerData: string,
        partyService: string,
        sharedData: string,
    }
}

//class

/**
 * * Class ID: @ing3kth/valapi/ValRegion
 */
class Region extends CustomEvent {
    private base:keyof typeof _Region | string;
    private region:any;
    private server:any;
    /**
    * @param {String} region Region
    * @returns {IValRegion}
    */
    constructor(region:keyof typeof _Region = 'na') {
        super();
        this.base = region;

        if(!_Region[region] || region === 'data') {
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
     public toJSON():ValWrapperRegion {
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
     public static toString(region: keyof typeof _Region.data):keyof typeof _Region {
        return _Region.data[region] as keyof typeof _Region;
    }

    /**
     * @param {String} region Region
     * @returns {ValWrapperRegion}
     */
     public static fromString(region: keyof typeof _Region.data):ValWrapperRegion {
        const _region = new Region(Region.toString(region));
        return _region.toJSON();
    }
}

//export
export { Region };
export type { ValWrapperRegion };