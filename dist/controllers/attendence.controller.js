"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAttendanceList = exports.markHolidayForDate = exports.deleteAttendance = exports.getAttendanceByDate = exports.getAttendanceByEmployee = exports.updateAttendance = exports.markAttendance = void 0;
const attendanceService = __importStar(require("../services/attendance.service"));
const response_handler_1 = require("../utils/response.handler");
const logger_1 = require("../utils/logger");
const attendence_validators_1 = require("../validators/attendence.validators");
const express_validator_1 = require("express-validator");
const validateRequest = (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        response_handler_1.ResponseHandler.failure(req, res, 'Validation error', 400, new Error(errors.array().map(e => e.msg).join(', ')));
        return false;
    }
    return true;
};
exports.markAttendance = [
    ...attendence_validators_1.markAttendanceValidator,
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (!validateRequest(req, res))
            return;
        try {
            const result = yield attendanceService.markAttendance(req.body);
            response_handler_1.ResponseHandler.success(req, res, 'Attendance marked successfully', result.created ? 201 : 200, result.data);
        }
        catch (error) {
            logger_1.Logger.instance().log(error instanceof Error ? error.message : String(error));
            response_handler_1.ResponseHandler.failure(req, res, 'Error marking attendance', 500, error instanceof Error ? error : undefined);
        }
    })
];
exports.updateAttendance = [
    ...attendence_validators_1.updateAttendanceValidator,
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (!validateRequest(req, res))
            return;
        try {
            const result = yield attendanceService.updateAttendance(+req.params.id, req.body);
            response_handler_1.ResponseHandler.success(req, res, 'Attendance updated successfully', 200, result.data);
        }
        catch (error) {
            logger_1.Logger.instance().log(error instanceof Error ? error.message : String(error));
            response_handler_1.ResponseHandler.failure(req, res, 'Error updating attendance', 500, error instanceof Error ? error : undefined);
        }
    })
];
exports.getAttendanceByEmployee = [
    ...attendence_validators_1.getAttendanceByEmployeeValidator,
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (!validateRequest(req, res))
            return;
        try {
            const result = yield attendanceService.getAttendanceByEmployee(+req.params.employeeId);
            if (!result.data) {
                response_handler_1.ResponseHandler.failure(req, res, 'Attendance records not found', 404);
                return;
            }
            response_handler_1.ResponseHandler.success(req, res, 'Attendance retrieved successfully', 200, result.data);
        }
        catch (error) {
            logger_1.Logger.instance().log(error instanceof Error ? error.message : String(error));
            response_handler_1.ResponseHandler.failure(req, res, 'Error retrieving attendance', 500, error instanceof Error ? error : undefined);
        }
    })
];
exports.getAttendanceByDate = [
    ...attendence_validators_1.getAttendanceByDateValidator,
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (!validateRequest(req, res))
            return;
        try {
            const result = yield attendanceService.getAttendanceByDate(req.params.date);
            if (!result.data) {
                response_handler_1.ResponseHandler.failure(req, res, 'Attendance records not found', 404);
                return;
            }
            response_handler_1.ResponseHandler.success(req, res, 'Attendance retrieved successfully', 200, result.data);
        }
        catch (error) {
            logger_1.Logger.instance().log(error instanceof Error ? error.message : String(error));
            response_handler_1.ResponseHandler.failure(req, res, 'Error retrieving attendance', 500, error instanceof Error ? error : undefined);
        }
    })
];
exports.deleteAttendance = [
    ...attendence_validators_1.deleteAttendanceValidator,
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (!validateRequest(req, res))
            return;
        try {
            yield attendanceService.deleteAttendance(+req.params.id);
            response_handler_1.ResponseHandler.success(req, res, 'Attendance deleted successfully', 200);
        }
        catch (error) {
            logger_1.Logger.instance().log(error instanceof Error ? error.message : String(error));
            response_handler_1.ResponseHandler.failure(req, res, 'Error deleting attendance', 500, error instanceof Error ? error : undefined);
        }
    })
];
exports.markHolidayForDate = [
    ...attendence_validators_1.markHolidayForDateValidator,
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (!validateRequest(req, res))
            return;
        try {
            const result = yield attendanceService.markHolidayForDate(req.body.roleId, req.body.date);
            response_handler_1.ResponseHandler.success(req, res, 'Holiday marked successfully', 200, result.data);
        }
        catch (error) {
            logger_1.Logger.instance().log(error instanceof Error ? error.message : String(error));
            response_handler_1.ResponseHandler.failure(req, res, 'Error marking holiday', 500, error instanceof Error ? error : undefined);
        }
    })
];
exports.getAttendanceList = [
    ...attendence_validators_1.getAttendanceListValidator,
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (!validateRequest(req, res))
            return;
        try {
            const result = yield attendanceService.getAttendanceList(req.query.roleId, req.query.date);
            response_handler_1.ResponseHandler.success(req, res, 'Attendance list retrieved successfully', 200, result.data);
        }
        catch (error) {
            logger_1.Logger.instance().log(error instanceof Error ? error.message : String(error));
            response_handler_1.ResponseHandler.failure(req, res, 'Error retrieving attendance list', 500, error instanceof Error ? error : undefined);
        }
    })
];
