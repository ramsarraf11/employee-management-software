"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employee_controller_1 = require("../controllers/employee.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
// import { authorizeSchoolAdmin } from '../middlewares/role.middleware';
const employeeRoutes = (0, express_1.Router)();
employeeRoutes.post('/', auth_middleware_1.authenticate, employee_controller_1.createEmployee);
employeeRoutes.get('/:id', auth_middleware_1.authenticate, employee_controller_1.getEmployeeById);
employeeRoutes.put('/:id', auth_middleware_1.authenticate, employee_controller_1.updateEmployee);
employeeRoutes.delete('/:id', auth_middleware_1.authenticate, employee_controller_1.deleteEmployee);
employeeRoutes.get('/', auth_middleware_1.authenticate, employee_controller_1.searchEmployees);
// search by roleId or name 
// employeeRoutes.get('/search', authenticate, authorizeSchoolAdmin, getEmployeeByRoleOrName);
exports.default = employeeRoutes;
