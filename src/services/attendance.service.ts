import * as attendanceRepo from '../repositories/attendance.repository';

export const markAttendance = async (body: any) => attendanceRepo.findOrCreateOrUpdateAttendance(body);

export const updateAttendance = async (attendanceId: number, data: any) => attendanceRepo.updateAttendance(attendanceId, data);

export const getAttendanceByEmployee = async (employeeId: number) => attendanceRepo.getAttendanceByEmployee(employeeId);

export const getAttendanceByDate = async (date: string) => attendanceRepo.getAttendanceByDate(date);

export const deleteAttendance = async (id: number) => attendanceRepo.deleteAttendance(id);

export const markHolidayForDate = async (roleId: string, date: string) => attendanceRepo.bulkMarkHoliday(roleId, date);

export const getAttendanceList = async (roleId: string, date: string) => attendanceRepo.getAttendanceListByRoleAndDate(roleId, date);
