import { Request, Response } from 'express';
import * as attendanceService from '../services/attendance.service';
import { ResponseHandler } from '../utils/response.handler';
import { Logger } from '../utils/logger';
import {
    markAttendanceValidator,
    updateAttendanceValidator,
    getAttendanceByEmployeeValidator,
    getAttendanceByDateValidator,
    deleteAttendanceValidator,
    markHolidayForDateValidator,
    getAttendanceListValidator,
} from '../validators/attendence.validators';
import { validationResult } from 'express-validator';

const validateRequest = (req: Request, res: Response): boolean => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        ResponseHandler.failure(req, res, 'Validation error', 400, new Error(errors.array().map(e => e.msg).join(', ')));
        return false;
    }
    return true;
};

export const markAttendance = [
    ...markAttendanceValidator,
    async (req: Request, res: Response): Promise<void> => {
        if (!validateRequest(req, res)) return;
        try {
            const result = await attendanceService.markAttendance(req.body);
            ResponseHandler.success(
                req,
                res,
                'Attendance marked successfully',
                result.created ? 201 : 200,
                result.data,
            );
        } catch (error) {
            Logger.instance().log(error instanceof Error ? error.message : String(error));
            ResponseHandler.failure(req, res, 'Error marking attendance', 500, error instanceof Error ? error : undefined);
        }
    }
];

export const updateAttendance = [
    ...updateAttendanceValidator,
    async (req: Request, res: Response): Promise<void> => {
        if (!validateRequest(req, res)) return;
        try {
            const result = await attendanceService.updateAttendance(+req.params.id, req.body);
            ResponseHandler.success(req, res, 'Attendance updated successfully', 200, result.data);
        } catch (error) {
            Logger.instance().log(error instanceof Error ? error.message : String(error));
            ResponseHandler.failure(req, res, 'Error updating attendance', 500, error instanceof Error ? error : undefined);
        }
    }
];

export const getAttendanceByEmployee = [
    ...getAttendanceByEmployeeValidator,
    async (req: Request, res: Response): Promise<void> => {
        if (!validateRequest(req, res)) return;
        try {
            const result = await attendanceService.getAttendanceByEmployee(+req.params.employeeId);
            if (!result.data) {
                ResponseHandler.failure(req, res, 'Attendance records not found', 404);
                return;
            }
            ResponseHandler.success(req, res, 'Attendance retrieved successfully', 200, result.data);
        } catch (error) {
            Logger.instance().log(error instanceof Error ? error.message : String(error));
            ResponseHandler.failure(req, res, 'Error retrieving attendance', 500, error instanceof Error ? error : undefined);
        }
    }
];

export const getAttendanceByDate = [
    ...getAttendanceByDateValidator,
    async (req: Request, res: Response): Promise<void> => {
        if (!validateRequest(req, res)) return;
        try {
            const result = await attendanceService.getAttendanceByDate(req.params.date);
            if (!result.data) {
                ResponseHandler.failure(req, res, 'Attendance records not found', 404);
                return;
            }
            ResponseHandler.success(req, res, 'Attendance retrieved successfully', 200, result.data);
        } catch (error) {
            Logger.instance().log(error instanceof Error ? error.message : String(error));
            ResponseHandler.failure(req, res, 'Error retrieving attendance', 500, error instanceof Error ? error : undefined);
        }
    }
];

export const deleteAttendance = [
    ...deleteAttendanceValidator,
    async (req: Request, res: Response): Promise<void> => {
        if (!validateRequest(req, res)) return;
        try {
            await attendanceService.deleteAttendance(+req.params.id);
            ResponseHandler.success(req, res, 'Attendance deleted successfully', 200);
        } catch (error) {
            Logger.instance().log(error instanceof Error ? error.message : String(error));
            ResponseHandler.failure(req, res, 'Error deleting attendance', 500, error instanceof Error ? error : undefined);
        }
    }
];

export const markHolidayForDate = [
    ...markHolidayForDateValidator,
    async (req: Request, res: Response): Promise<void> => {
        if (!validateRequest(req, res)) return;
        try {
            const result = await attendanceService.markHolidayForDate(req.body.roleId, req.body.date);
            ResponseHandler.success(req, res, 'Holiday marked successfully', 200, result.data);
        } catch (error) {
            Logger.instance().log(error instanceof Error ? error.message : String(error));
            ResponseHandler.failure(req, res, 'Error marking holiday', 500, error instanceof Error ? error : undefined);
        }
    }
];

export const getAttendanceList = [
    ...getAttendanceListValidator,
    async (req: Request, res: Response): Promise<void> => {
        if (!validateRequest(req, res)) return;
        try {
            const result = await attendanceService.getAttendanceList(req.query.roleId as string, req.query.date as string);
            ResponseHandler.success(req, res, 'Attendance list retrieved successfully', 200, result.data);
        } catch (error) {
            Logger.instance().log(error instanceof Error ? error.message : String(error));
            ResponseHandler.failure(req, res, 'Error retrieving attendance list', 500, error instanceof Error ? error : undefined);
        }
    }
];
