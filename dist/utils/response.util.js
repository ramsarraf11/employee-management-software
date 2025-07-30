"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.handleFailure = exports.handleSuccess = void 0;
/**
 * Handle success responses
 * @param res - Express Response object
 * @param message - Success message
 * @param data - Optional data to include in the response
 */
const handleSuccess = (res, message, data = null) => {
    res.status(200).json({
        success: true,
        message,
        data,
    });
};
exports.handleSuccess = handleSuccess;
/**
 * Handle failure responses
 * @param res - Express Response object
 * @param message - Failure message
 * @param statusCode - HTTP status code (default: 400)
 */
const handleFailure = (res, message, statusCode = 400) => {
    res.status(statusCode).json({
        success: false,
        message,
    });
};
exports.handleFailure = handleFailure;
/**
 * Handle error responses
 * @param res - Express Response object
 * @param error - Error object or message
 * @param statusCode - HTTP status code (default: 500)
 */
const handleError = (res, error, statusCode = 500) => {
    res.status(statusCode).json({
        success: false,
        message: error.message || 'Internal Server Error',
        error: error.stack || error,
    });
};
exports.handleError = handleError;
