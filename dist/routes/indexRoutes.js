"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeRoutes = void 0;
const express_1 = require("express");
// import studentRoutes from './student.routes';
const organization_routes_1 = __importDefault(require("./organization.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const employee_routes_1 = __importDefault(require("./employee.routes"));
const attendence_routes_1 = __importDefault(require("./attendence.routes"));
// import departmentRoutes from './department.routes';
// import designationRoutes from './designation.routes';
// import leaveRoutes from './leave.routes';
// import payrollRoutes from './payroll.routes';
// import shiftRoutes from './shift.routes';
// import teacherRoutes from './teacher.routes';
// import { authenticate } from '../middlewares/auth.middleware';
// import feeRoutes from './fee.routes';
const router = (0, express_1.Router)();
/**
 * Initialize all routes
 * @param app - Express application instance
 * @param baseUrl - Base URL for the API
 */
const initializeRoutes = (app) => {
    app.use(`/auth`, auth_routes_1.default);
    //app.use(authenticate); // Apply authentication middleware globally for all routes
    // app.use(`/students`, studentRoutes);
    app.use(`/organizations`, organization_routes_1.default);
    app.use(`/users`, user_routes_1.default);
    app.use(`/employee`, employee_routes_1.default);
    // app.use(`/departments`, departmentRoutes);
    // app.use(`/designations`, designationRoutes);
    // app.use(`/leaves`, leaveRoutes);
    // app.use(`/payroll`, payrollRoutes);
    // app.use(`/shifts`, shiftRoutes);
    // app.use(`/teachers`, teacherRoutes);
    // app.use('/fees', feeRoutes);
    app.use(`/attendance`, attendence_routes_1.default);
};
exports.initializeRoutes = initializeRoutes;
exports.default = router;
