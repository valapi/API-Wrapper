"use strict";
//import
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
const tslib_1 = require("tslib");
//service
class Session {
    /**
     *
     * @param {ValRequestClient} ValRequestClient Request Client
     * @param {ValRegion.Json} Region Region Service Data
     */
    constructor(ValRequestClient, Region) {
        this.RequestClient = ValRequestClient;
        this.Region = Region;
    }
    /**
     * @param {string} puuid Player UUID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    Get(puuid) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(`${this.Region.url.partyService}/session/v1/sessions/${puuid}`);
        });
    }
    /**
     * * Careful to use, Riot will immediately shut down your Project.
     * @param {string} puuid Player UUID
     * @returns {Promise<ValRequestClient.Response<any>>}
     */
    ReConnect(puuid) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.RequestClient.get(`${this.Region.url.partyService}/session/v1/sessions/${puuid}/reconnect`);
        });
    }
}
exports.Session = Session;
