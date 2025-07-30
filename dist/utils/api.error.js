"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError extends Error {
    constructor(httpErrorCode, errorMessage) {
        super();
        this._errorMessage = 'An unexpected error has occurred.';
        this._httpErrorCode = 500;
        this._httpErrorCode = httpErrorCode;
        this._errorMessage = errorMessage;
        this.message = errorMessage;
    }
    get errorMessage() {
        return this._errorMessage;
    }
    get httpErrorCode() {
        return this._httpErrorCode;
    }
}
exports.ApiError = ApiError;
