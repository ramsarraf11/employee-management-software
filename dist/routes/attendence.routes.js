"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const attendence_controller_1 = require("../controllers/attendence.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const attendanceRoutes = (0, express_1.Router)();
// Mark individual attendance
attendanceRoutes.post('/', auth_middleware_1.authenticate, attendence_controller_1.markAttendance);
// Update (edit) an existing attendance record
attendanceRoutes.put('/:id', auth_middleware_1.authenticate, attendence_controller_1.updateAttendance);
// Get attendance for an employee (by employee ID)
attendanceRoutes.get('/employee/:employeeId', auth_middleware_1.authenticate, attendence_controller_1.getAttendanceByEmployee);
// Get all attendance for a particular date
attendanceRoutes.get('/date/:date', auth_middleware_1.authenticate, attendence_controller_1.getAttendanceByDate);
// Delete attendance (optional, rarely used)
attendanceRoutes.delete('/:id', auth_middleware_1.authenticate, attendence_controller_1.deleteAttendance);
// Bulk mark as holiday for specific role & date
attendanceRoutes.post('/holiday', auth_middleware_1.authenticate, attendence_controller_1.markHolidayForDate);
// Get staff attendance list for given role and date (matches your UI)
attendanceRoutes.get('/list', auth_middleware_1.authenticate, attendence_controller_1.getAttendanceList);
// Example: GET /api/attendance/list?roleId=Principal&date=2025-08-07
exports.default = attendanceRoutes;
