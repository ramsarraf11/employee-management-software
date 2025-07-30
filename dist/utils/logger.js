"use strict";
/* eslint-disable no-console */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
class Logger {
    constructor() {
        this.log = (message) => {
            if (process.env.NODE_ENV === 'test') {
                return;
            }
            const dateTime = new Date().toISOString();
            const temp_str = dateTime + '> ' + message;
            console.log(' ');
            console.log(temp_str);
        };
        this.error = (message, code, details) => {
            if (process.env.NODE_ENV === 'test') {
                return;
            }
            const dateTime = new Date().toISOString();
            const err = {
                message: message,
                code: code,
                details: details
            };
            const temp_str = dateTime + '> ' + JSON.stringify(err, null, '    ');
            console.log(' ');
            console.log(temp_str);
        };
    }
    static instance() {
        return this._instance || (this._instance = new this());
    }
}
exports.Logger = Logger;
