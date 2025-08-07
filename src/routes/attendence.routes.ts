import { Router } from 'express';
import {
    markAttendance,
    getAttendanceByEmployee,
    getAttendanceByDate,
    updateAttendance,
    deleteAttendance,
    markHolidayForDate,
    getAttendanceList // for the Staff Attendance List view
} from '../controllers/attendence.controller';
import { authenticate } from '../middlewares/auth.middleware';

const attendanceRoutes = Router();

// Mark individual attendance
attendanceRoutes.post('/', authenticate, markAttendance);

// Update (edit) an existing attendance record
attendanceRoutes.put('/:id', authenticate, updateAttendance);

// Get attendance for an employee (by employee ID)
attendanceRoutes.get('/employee/:employeeId', authenticate, getAttendanceByEmployee);

// Get all attendance for a particular date
attendanceRoutes.get('/date/:date', authenticate, getAttendanceByDate);

// Delete attendance (optional, rarely used)
attendanceRoutes.delete('/:id', authenticate, deleteAttendance);

// Bulk mark as holiday for specific role & date
attendanceRoutes.post('/holiday', authenticate, markHolidayForDate);

// Get staff attendance list for given role and date (matches your UI)
attendanceRoutes.get('/list', authenticate, getAttendanceList);

// Example: GET /api/attendance/list?roleId=Principal&date=2025-08-07

export default attendanceRoutes;
