import { body, param, query } from 'express-validator';

export const markAttendanceValidator = [
    body('employeeId').isInt().withMessage('employeeId is required and must be integer'),
    body('date').isISO8601().withMessage('date is required and must be in YYYY-MM-DD'),
    body('status').isIn(['Present', 'Absent', 'Holiday']),
    body('isLate').optional().isBoolean(),
    body('inTime').optional().matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    body('outTime').optional().matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
];

export const updateAttendanceValidator = [
    param('id').isInt().withMessage('id must be integer'),
    body('status').optional().isIn(['Present', 'Absent', 'Holiday']),
    body('isLate').optional().isBoolean(),
    body('inTime').optional().matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    body('outTime').optional().matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
];

export const getAttendanceByEmployeeValidator = [
    param('employeeId').isInt().withMessage('employeeId must be integer'),
];

export const getAttendanceByDateValidator = [
    param('date').isISO8601().withMessage('date must be in YYYY-MM-DD'),
];

export const deleteAttendanceValidator = [
    param('id').isInt().withMessage('id must be integer'),
];

export const markHolidayForDateValidator = [
    body('roleId').isString().withMessage('roleId is required'),
    body('date').isISO8601().withMessage('date is required and must be in YYYY-MM-DD'),
];

export const getAttendanceListValidator = [
    query('roleId').isString().withMessage('roleId is required'),
    query('date').isISO8601().withMessage('date is required (YYYY-MM-DD)'),
];
