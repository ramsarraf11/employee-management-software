import { Router } from 'express';
import {
  createEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  searchEmployees,
  getEmployeeByRoleOrName
} from '../controllers/employee.controller';
import { authenticate } from '../middlewares/auth.middleware';
// import { authorizeSchoolAdmin } from '../middlewares/role.middleware';

const employeeRoutes = Router();

employeeRoutes.post('/', authenticate, createEmployee);
employeeRoutes.get('/:id', authenticate, getEmployeeById);
employeeRoutes.put('/:id', authenticate, updateEmployee);
employeeRoutes.delete('/:id', authenticate, deleteEmployee);
employeeRoutes.get('/', authenticate, searchEmployees);

// search by roleId or name 
// employeeRoutes.get('/search', authenticate, authorizeSchoolAdmin, getEmployeeByRoleOrName);

export default employeeRoutes;