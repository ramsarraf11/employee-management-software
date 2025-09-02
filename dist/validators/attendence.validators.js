"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAttendanceListValidator = exports.markHolidayForDateValidator = exports.deleteAttendanceValidator = exports.getAttendanceByDateValidator = exports.getAttendanceByEmployeeValidator = exports.updateAttendanceValidator = exports.markAttendanceValidator = void 0;
const express_validator_1 = require("express-validator");
exports.markAttendanceValidator = [
    (0, express_validator_1.body)('employeeId').isInt().withMessage('employeeId is required and must be integer'),
    (0, express_validator_1.body)('date').isISO8601().withMessage('date is required and must be in YYYY-MM-DD'),
    (0, express_validator_1.body)('status').isIn(['Present', 'Absent', 'Holiday']),
    (0, express_validator_1.body)('isLate').optional().isBoolean(),
    (0, express_validator_1.body)('inTime').optional().matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    (0, express_validator_1.body)('outTime').optional().matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
];
exports.updateAttendanceValidator = [
    (0, express_validator_1.param)('id').isInt().withMessage('id must be integer'),
    (0, express_validator_1.body)('status').optional().isIn(['Present', 'Absent', 'Holiday']),
    (0, express_validator_1.body)('isLate').optional().isBoolean(),
    (0, express_validator_1.body)('inTime').optional().matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    (0, express_validator_1.body)('outTime').optional().matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
];
exports.getAttendanceByEmployeeValidator = [
    (0, express_validator_1.param)('employeeId').isInt().withMessage('employeeId must be integer'),
];
exports.getAttendanceByDateValidator = [
    (0, express_validator_1.param)('date').isISO8601().withMessage('date must be in YYYY-MM-DD'),
];
exports.deleteAttendanceValidator = [
    (0, express_validator_1.param)('id').isInt().withMessage('id must be integer'),
];
exports.markHolidayForDateValidator = [
    (0, express_validator_1.body)('roleId').isString().withMessage('roleId is required'),
    (0, express_validator_1.body)('date').isISO8601().withMessage('date is required and must be in YYYY-MM-DD'),
];
exports.getAttendanceListValidator = [
    (0, express_validator_1.query)('roleId').isString().withMessage('roleId is required'),
    (0, express_validator_1.query)('date').isISO8601().withMessage('date is required (YYYY-MM-DD)'),
];
