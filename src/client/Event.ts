//class
class Event {
    protected EventController: {
        //key:value
        [key: string]: Array<Function>;
    };

    constructor() {
        this.EventController = {};
    }

    /**
     * 
     * @param {String} name Name
     * @param {any} args Data
     */
     protected emit(name: string, ...args: Array<any>): void {
        if (this.EventController[name]) {
            this.EventController[name].forEach((callback:Function) => {
                callback(...args);
            });
        }
    }

    /**
     * 
     * @param {String} name Name
     * @param {Function} callback Call Back Function
     */
     public off(name: string, callback?: Function): void {
        if (this.EventController[name]) {
            if (callback) {
                this.EventController[name] = this.EventController[name].filter((cb:Function) => {
                    return cb !== callback;
                });
            } else {
                delete this.EventController[name];
            }
        }
    }

    /**
     * 
     * @param {String} name Name
     * @param {Function} callback Call Back Function
     */
     public on(name: string, callback: Function): void {
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
     public once(name: string, callback: Function): void {
        const self = this;
        const onceCallback = function (...args: Array<any>) {
            callback(...args);
            self.off(name, onceCallback);
        };

        this.on(name, onceCallback);
    }

}

//export
export { Event }