"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
//class
class Event {
    constructor() {
        this.EventController = {};
    }
    /**
     *
     * @param {String} name Name
     * @param {any} args Data
     */
    emit(name, ...args) {
        if (this.EventController[name]) {
            this.EventController[name].forEach((callback) => {
                callback(...args);
            });
        }
    }
    /**
     *
     * @param {String} name Name
     * @param {Function} callback Call Back Function
     */
    off(name, callback) {
        if (this.EventController[name]) {
            if (callback) {
                this.EventController[name] = this.EventController[name].filter((cb) => {
                    return cb !== callback;
                });
            }
            else {
                delete this.EventController[name];
            }
        }
    }
    /**
     *
     * @param {String} name Name
     * @param {Function} callback Call Back Function
     */
    on(name, callback) {
        if (!this.EventController[name]) {
            this.EventController[name] = [];
        }
        this.EventController[name].push(callback);
    }
    /**
     *
     * @param {String} name Name
     * @param {Function} callback Call Back Function
     */
    once(name, callback) {
        const self = this;
        const onceCallback = function (...args) {
            callback(...args);
            self.off(name, onceCallback);
        };
        this.on(name, onceCallback);
    }
}
exports.Event = Event;
//# sourceMappingURL=Event.js.map