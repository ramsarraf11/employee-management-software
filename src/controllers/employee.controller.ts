import { Request, Response } from 'express';
import {
  createEmployeeService,
  getEmployeeByIdService,
  updateEmployeeService,
  deleteEmployeeService,
  searchEmployeesService,
  getEmployeeByRoleIdOrName,
} from '../services/employe.service';
import { ResponseHandler } from '../utils/response.handler';
import { Logger } from '../utils/logger';

/**
 * Create a new employee.
 */
export const createEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const employee = await createEmployeeService(req.body);
    ResponseHandler.success(req, res, 'Employee created successfully', 201, employee);
  } catch (error) {
    console.error('Error creating employee:', error);
    ResponseHandler.failure(req, res, 'An error occurred while creating the employee', 500, error instanceof Error ? error : undefined);
  }
};

/**
 * Get an employee by its ID.
 */
export const getEmployeeById = async (req: Request, res: Response): Promise<void> => {
  try {
    const employee = await getEmployeeByIdService(Number(req.params.id));
    if (!employee) {
      ResponseHandler.failure(req, res, 'Employee not found', 404);
      return;
    }
    ResponseHandler.success(req, res, 'Employee retrieved successfully', 200, employee);
  } catch (error) {
    console.error('Error retrieving employee:', error);
    ResponseHandler.failure(req, res, 'An error occurred while retrieving the employee', 500, error instanceof Error ? error : undefined);
  }
};

/**
 * Update an employee by its ID.
 */
export const updateEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const employee = await updateEmployeeService(Number(req.params.id), req.body);
    ResponseHandler.success(req, res, 'Employee updated successfully', 200, employee);
  } catch (error) {
    console.error('Error updating employee:', error);
    ResponseHandler.failure(req, res, 'An error occurred while updating the employee', 500, error instanceof Error ? error : undefined);
  }
};

/**
 * Delete an employee by its ID.
 */
export const deleteEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    await deleteEmployeeService(Number(req.params.id));
    ResponseHandler.success(req, res, 'Employee deleted successfully', 200);
  } catch (error) {
    console.error('Error deleting employee:', error);
    ResponseHandler.failure(req, res, 'An error occurred while deleting the employee', 500, error instanceof Error ? error : undefined);
  }
};

/**
 * Search employees based on query parameters.
 */
export const searchEmployees = async (req: Request, res: Response): Promise<void> => {
  try {
    const employees = await searchEmployeesService(req.query);
    ResponseHandler.success(req, res, 'Employees retrieved successfully', 200, employees);
  } catch (error) {
    console.error('Error searching employees:', error);
    ResponseHandler.failure(req, res, 'An error occurred while searching employees', 500, error instanceof Error ? error : undefined);
  }
};

/**
 * Get employees by role ID or name.
 */
export const getEmployeeByRoleOrName = async (req: Request, res: Response): Promise<void> => {
  try {
    const { roleId, name } = req.query;
    if (!roleId && !name) {
      ResponseHandler.failure(req, res, 'Please provide either roleId or name', 400);
      return;
    }

    const employees = await getEmployeeByRoleIdOrName(roleId, name);
    ResponseHandler.success(req, res, 'Employees retrieved successfully', 200, employees);
  } catch (error) {
    Logger.instance().log(error instanceof Error ? error.message : String(error));
    ResponseHandler.failure(req, res, 'An error occurred while retrieving employees', 500, error instanceof Error ? error : undefined);
  }
};