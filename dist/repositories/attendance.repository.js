"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAttendanceListByRoleAndDate = exports.bulkMarkHoliday = exports.deleteAttendance = exports.getAttendanceByDate = exports.getAttendanceByEmployee = exports.updateAttendance = exports.findOrCreateOrUpdateAttendance = void 0;
const attendence_model_1 = __importDefault(require("../models/attendence.model"));
const employee_model_1 = __importDefault(require("../models/employee.model"));
const sequelize_1 = require("sequelize");
// Create or update attendance for a record
const findOrCreateOrUpdateAttendance = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const { employeeId, date, status, isLate, inTime, outTime } = input;
    try {
        const [attendance, created] = yield attendence_model_1.default.findOrCreate({
            where: { employeeId, date },
            defaults: { status, isLate, inTime, outTime }
        });
        if (!created) {
            attendance.status = status;
            attendance.inTime = inTime;
            attendance.outTime = outTime;
            yield attendance.save();
        }
        return { data: attendance, created };
    }
    catch (error) {
        return { error: error.message };
    }
});
exports.findOrCreateOrUpdateAttendance = findOrCreateOrUpdateAttendance;
// Update attendance by primary key (id)
const updateAttendance = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const attendance = yield attendence_model_1.default.findByPk(id);
        if (!attendance)
            return { error: 'Attendance not found' };
        yield attendance.update(data);
        return { data: attendance };
    }
    catch (error) {
        return { error: error.message };
    }
});
exports.updateAttendance = updateAttendance;
// Get all attendance records for an employee
const getAttendanceByEmployee = (employeeId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const attendances = yield attendence_model_1.default.findAll({ where: { employeeId } });
        return { data: attendances };
    }
    catch (error) {
        return { error: error.message };
    }
});
exports.getAttendanceByEmployee = getAttendanceByEmployee;
// Get all attendances for a specific date
const getAttendanceByDate = (date) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const attendances = yield attendence_model_1.default.findAll({ where: { date } });
        return { data: attendances };
    }
    catch (error) {
        return { error: error.message };
    }
});
exports.getAttendanceByDate = getAttendanceByDate;
// Delete an attendance record by primary key (id)
const deleteAttendance = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const attendance = yield attendence_model_1.default.findByPk(id);
        if (!attendance)
            return { error: 'Attendance not found' };
        yield attendance.destroy();
        return { data: { message: 'Deleted' } };
    }
    catch (error) {
        return { error: error.message };
    }
});
exports.deleteAttendance = deleteAttendance;
// Bulk mark as Holiday for all employees of a given role on a specific date
const bulkMarkHoliday = (roleId, date) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employees = yield employee_model_1.default.findAll({ where: { roleId } });
        yield Promise.all(employees.map(emp => attendence_model_1.default.upsert({
            employeeId: emp.id,
            date,
            status: 'Holiday',
            isLate: false
        })));
        return { data: { message: 'Marked as holiday for all applicable employees.' } };
    }
    catch (error) {
        return { error: error.message };
    }
});
exports.bulkMarkHoliday = bulkMarkHoliday;
// Get staff attendance list by role and date
const getAttendanceListByRoleAndDate = (roleId, date) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employees = yield employee_model_1.default.findAll({ where: { roleId } });
        const attendanceList = yield attendence_model_1.default.findAll({
            where: {
                date,
                employeeId: { [sequelize_1.Op.in]: employees.map(e => e.id) }
            }
        });
        // Compose result for attendance list view
        const data = employees.map(emp => {
            var _a, _b, _c;
            const attendance = attendanceList.find(a => a.employeeId === emp.id);
            return {
                staffId: emp.id,
                name: `${emp.firstName} ${emp.lastName}`,
                contact: emp.contactNumber,
                attendanceStatus: (_a = attendance === null || attendance === void 0 ? void 0 : attendance.status) !== null && _a !== void 0 ? _a : 'Absent',
                inTime: (_b = attendance === null || attendance === void 0 ? void 0 : attendance.inTime) !== null && _b !== void 0 ? _b : '',
                outTime: (_c = attendance === null || attendance === void 0 ? void 0 : attendance.outTime) !== null && _c !== void 0 ? _c : ''
            };
        });
        return { data };
    }
    catch (error) {
        return { error: error.message };
    }
});
exports.getAttendanceListByRoleAndDate = getAttendanceListByRoleAndDate;
