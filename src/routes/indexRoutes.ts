import { Router } from 'express';
// import studentRoutes from './student.routes';
import organizationRoutes from './organization.routes';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import employeeRoutes from './employee.routes';
// import departmentRoutes from './department.routes';
// import designationRoutes from './designation.routes';
// import leaveRoutes from './leave.routes';
// import payrollRoutes from './payroll.routes';
// import shiftRoutes from './shift.routes';
// import teacherRoutes from './teacher.routes';
// import { authenticate } from '../middlewares/auth.middleware';
// import feeRoutes from './fee.routes';

const router = Router();

/**
 * Initialize all routes
 * @param app - Express application instance
 * @param baseUrl - Base URL for the API
 */
export const initializeRoutes = (app: any): void => {
    app.use(`/auth`, authRoutes);
    //app.use(authenticate); // Apply authentication middleware globally for all routes
    // app.use(`/students`, studentRoutes);
    app.use(`/organizations`, organizationRoutes);
    app.use(`/users`, userRoutes);
    app.use(`/employee`, employeeRoutes);
    // app.use(`/departments`, departmentRoutes);
    // app.use(`/designations`, designationRoutes);
    // app.use(`/leaves`, leaveRoutes);
    // app.use(`/payroll`, payrollRoutes);
    // app.use(`/shifts`, shiftRoutes);
    // app.use(`/teachers`, teacherRoutes);
    // app.use('/fees', feeRoutes);
};

export default router;