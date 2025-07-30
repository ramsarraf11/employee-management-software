"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseHandler = void 0;
const api_error_1 = require("./api.error");
const input_validation_1 = require("./input.validation");
class ResponseHandler {
    /**
     * Handles failure responses
     * @param request - Express request object
     * @param response - Express response object
     * @param message - Error message
     * @param httpErrorCode - HTTP status code (default: 500)
     * @param error - Error object (optional)
     */
    static failure(request, response, message = 'An error has occurred.', httpErrorCode = 500, error) {
        const clientIps = request.ips.length > 0 ? request.ips : [request.header('x-forwarded-for') || request.socket.remoteAddress];
        const responseObject = {
            status: 'failure',
            message: (error === null || error === void 0 ? void 0 : error.message) || message,
            httpCode: httpErrorCode,
            clientIps,
            apiVersion: process.env.API_VERSION,
            serviceVersion: process.env.SERVICE_VERSION,
        };
        return response.status(httpErrorCode).json(responseObject);
    }
    /**
     * Handles success responses
     * @param request - Express request object
     * @param response - Express response object
     * @param message - Success message
     * @param httpCode - HTTP status code (default: 200)
     * @param data - Response data (optional)
     * @param logDataObject - Whether to log the data object (default: true)
     */
    static success(request, response, message, httpCode = 200, data = null, logDataObject = true) {
        const clientIps = request.ips.length > 0 ? request.ips : [request.header('x-forwarded-for') || request.socket.remoteAddress];
        const responseObject = {
            status: 'success',
            message,
            httpCode,
            data,
            clientIps,
            apiVersion: process.env.API_VERSION,
            serviceVersion: process.env.SERVICE_VERSION,
        };
        return response.status(httpCode).json(responseObject);
    }
    /**
     * Handles errors and determines the appropriate response
     * @param request - Express request object
     * @param response - Express response object
     * @param error - Error object
     */
    static handleError(request, response, error) {
        if (error instanceof input_validation_1.InputValidationError) {
            ResponseHandler.failure(request, response, error.message, error.httpErrorCode, error);
        }
        else if (error instanceof api_error_1.ApiError) {
            ResponseHandler.failure(request, response, error.errorMessage, error.httpErrorCode, error);
        }
        else {
            ResponseHandler.failure(request, response, error.message, 500, error);
        }
    }
}
exports.ResponseHandler = ResponseHandler;
