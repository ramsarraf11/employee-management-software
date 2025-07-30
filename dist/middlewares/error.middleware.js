"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const response_util_1 = require("../utils/response.util");
/**
 * Global error handler middleware
 * @param err - Error object
 * @param req - Express Request object
 * @param res - Express Response object
 * @param next - Express NextFunction
 */
const globalErrorHandler = (err, req, res, next) => {
    console.error('Global Error:', err); // Log the error for debugging
    (0, response_util_1.handleError)(res, err);
};
exports.globalErrorHandler = globalErrorHandler;
