import Attendance from '../models/attendence.model';
import Employee from '../models/employee.model';
import { Op } from 'sequelize';

// Interface for attendance input (for create/update)
export interface AttendanceInput {
  employeeId: number;
  date: string;
  status: 'Present' | 'Absent' | 'Holiday' | 'Leave' | 'Late';
  isLate?: boolean;
  inTime?: string;
  outTime?: string;
}

// Create or update attendance for a record
export const findOrCreateOrUpdateAttendance = async (
  input: AttendanceInput
): Promise<{ data?: Attendance; created?: boolean; error?: string }> => {
  const { employeeId, date, status, isLate, inTime, outTime } = input;
  try {
    const [attendance, created] = await Attendance.findOrCreate({
      where: { employeeId, date },
      defaults: { status, isLate, inTime, outTime }
    });
    if (!created) {
      attendance.status = status;
      attendance.inTime = inTime;
      attendance.outTime = outTime;
      await attendance.save();
    }
    return { data: attendance, created };
  } catch (error: any) {
    return { error: error.message };
  }
};

// Update attendance by primary key (id)
export const updateAttendance = async (
  id: number,
  data: Partial<AttendanceInput>
): Promise<{ data?: Attendance; error?: string }> => {
  try {
    const attendance = await Attendance.findByPk(id);
    if (!attendance) return { error: 'Attendance not found' };
    await attendance.update(data);
    return { data: attendance };
  } catch (error: any) {
    return { error: error.message };
  }
};

// Get all attendance records for an employee
export const getAttendanceByEmployee = async (
  employeeId: number
): Promise<{ data?: Attendance[]; error?: string }> => {
  try {
    const attendances = await Attendance.findAll({ where: { employeeId } });
    return { data: attendances };
  } catch (error: any) {
    return { error: error.message };
  }
};

// Get all attendances for a specific date
export const getAttendanceByDate = async (
  date: string
): Promise<{ data?: Attendance[]; error?: string }> => {
  try {
    const attendances = await Attendance.findAll({ where: { date } });
    return { data: attendances };
  } catch (error: any) {
    return { error: error.message };
  }
};

// Delete an attendance record by primary key (id)
export const deleteAttendance = async (
  id: number
): Promise<{ data?: { message: string }; error?: string }> => {
  try {
    const attendance = await Attendance.findByPk(id);
    if (!attendance) return { error: 'Attendance not found' };
    await attendance.destroy();
    return { data: { message: 'Deleted' } };
  } catch (error: any) {
    return { error: error.message };
  }
};

// Bulk mark as Holiday for all employees of a given role on a specific date
export const bulkMarkHoliday = async (
  roleId: string,
  date: string
): Promise<{ data?: { message: string }; error?: string }> => {
  try {
    const employees = await Employee.findAll({ where: { roleId } });
    await Promise.all(
      employees.map(emp =>
        Attendance.upsert({
          employeeId: emp.id,
          date,
          status: 'Holiday',
          isLate: false
        })
      )
    );
    return { data: { message: 'Marked as holiday for all applicable employees.' } };
  } catch (error: any) {
    return { error: error.message };
  }
};

// Get staff attendance list by role and date
export const getAttendanceListByRoleAndDate = async (
  roleId: string,
  date: string
): Promise<{ data?: Array<any>; error?: string }> => {
  try {
    const employees = await Employee.findAll({ where: { roleId } });
    const attendanceList = await Attendance.findAll({
      where: {
        date,
        employeeId: { [Op.in]: employees.map(e => e.id) }
      }
    });
    // Compose result for attendance list view
    const data = employees.map(emp => {
      const attendance = attendanceList.find(a => a.employeeId === emp.id);
      return {
        staffId: emp.id,
        name: `${emp.firstName} ${emp.lastName}`,
        contact: emp.contactNumber,
        attendanceStatus: attendance?.status ?? 'Absent',
        inTime: attendance?.inTime ?? '',
        outTime: attendance?.outTime ?? ''
      };
    });
    return { data };
  } catch (error: any) {
    return { error: error.message };
  }
};
