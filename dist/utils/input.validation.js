"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputValidationError = void 0;
class InputValidationError extends Error {
    constructor(errorMessages) {
        super();
        this._errorMessages = [];
        this._httpErrorCode = 422;
        this._errorMessages = errorMessages;
        const str = JSON.stringify(this._errorMessages, null, 2);
        this.message = 'Input validation errors: ' + str;
    }
    get errorMessages() {
        return this._errorMessages;
    }
    get httpErrorCode() {
        return this._httpErrorCode;
    }
}
exports.InputValidationError = InputValidationError;
