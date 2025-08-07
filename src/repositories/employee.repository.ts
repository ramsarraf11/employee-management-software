import Employee from '../models/employee.model';
import { Op } from 'sequelize';

/////////////////////////////
export const createEmployee = async (data: Partial<Employee>) => {
  return await Employee.create(data);
};

export const getEmployeeById = async (id: number) => {
  return await Employee.findByPk(id);
};

export const updateEmployee = async (id: number, data: Partial<Employee>) => {
  const employee = await Employee.findByPk(id);
  if (!employee) throw new Error('Employee not found');
  return await employee.update(data);
};

export const deleteEmployee = async (id: number) => {
  const employee = await Employee.findByPk(id);
  if (!employee) throw new Error('Employee not found');
  return await employee.destroy();
};

export const searchEmployees = async (query: { role?: any; name?: any }) => {
  const whereClause: any = {};

  if (query.role) {
    whereClause.roleId = query.role;
  }

  if (query.name) {
    // Search by firstName or lastName containing the name substring (case-insensitive)
    whereClause[Op.or] = [
      { firstName: { [Op.iLike]: `%${query.name}%` } },
      { lastName: { [Op.iLike]: `%${query.name}%` } },
    ];
  }

  return await Employee.findAll({
    where: whereClause,
  });
};