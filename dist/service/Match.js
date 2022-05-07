"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Match = void 0;
//import
const AxiosClient_1 = require("../client/AxiosClient");
const Event_1 = require("../client/Event");
const QueueId_1 = __importDefault(require("../resources/QueueId"));
//service
class Match extends Event_1.Event {
    /**
    * @param {ValWrapperService} data Services Data
    */
    constructor(data) {
        super();
        this.AxiosClient = new AxiosClient_1.AxiosClient(data.AxiosData);
        this.AxiosClient.on('error', ((data) => {
            this.emit('error', data);
        }));
        this.Region = data.Region;
    }
    //PVP Endpoints
    /**
    * @description Get contract definitions
    * @param {String} matchId Match ID
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    FetchMatchDetails(matchId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.AxiosClient.get(this.Region.url.playerData + `/match-details/v1/matches/${matchId}`);
        });
    }
    /**
    * @param {String} puuid Player UUID
    * @param {String} queue Queue
    * @param {Number} startIndex Start Index
    * @param {Number} endIndex End Index
    * @returns {Promise<ValWrapperAxios<any>>}
    */
    FetchMatchHistory(puuid, queue, startIndex = 0, endIndex = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            let _url = this.Region.url.playerData + `/match-history/v1/history/${puuid}?startIndex=${String(startIndex)}&endIndex=${String(endIndex)}`;
            if (queue) {
                _url += `&queue=${QueueId_1.default.data[queue]}`;
            }
            return yield this.AxiosClient.get(_url);
        });
    }
}
exports.Match = Match;
//# sourceMappingURL=Match.js.map