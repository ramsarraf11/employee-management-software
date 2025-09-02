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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmployeeByRoleOrName = exports.searchEmployees = exports.deleteEmployee = exports.updateEmployee = exports.getEmployeeById = exports.createEmployee = void 0;
const employe_service_1 = require("../services/employe.service");
const response_handler_1 = require("../utils/response.handler");
const logger_1 = require("../utils/logger");
/**
 * Create a new employee.
 */ ///
const createEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employee = yield (0, employe_service_1.createEmployeeService)(req.body);
        response_handler_1.ResponseHandler.success(req, res, 'Employee created successfully', 201, employee);
    }
    catch (error) {
        console.error('Error creating employee:', error);
        response_handler_1.ResponseHandler.failure(req, res, 'An error occurred while creating the employee', 500, error instanceof Error ? error : undefined);
    }
});
exports.createEmployee = createEmployee;
/**
 * Get an employee by its ID.
 */
const getEmployeeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employee = yield (0, employe_service_1.getEmployeeByIdService)(Number(req.params.id));
        if (!employee) {
            response_handler_1.ResponseHandler.failure(req, res, 'Employee not found', 404);
            return;
        }
        response_handler_1.ResponseHandler.success(req, res, 'Employee retrieved successfully', 200, employee);
    }
    catch (error) {
        console.error('Error retrieving employee:', error);
        response_handler_1.ResponseHandler.failure(req, res, 'An error occurred while retrieving the employee', 500, error instanceof Error ? error : undefined);
    }
});
exports.getEmployeeById = getEmployeeById;
/**
 * Update an employee by its ID.
 */
const updateEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employee = yield (0, employe_service_1.updateEmployeeService)(Number(req.params.id), req.body);
        response_handler_1.ResponseHandler.success(req, res, 'Employee updated successfully', 200, employee);
    }
    catch (error) {
        console.error('Error updating employee:', error);
        response_handler_1.ResponseHandler.failure(req, res, 'An error occurred while updating the employee', 500, error instanceof Error ? error : undefined);
    }
});
exports.updateEmployee = updateEmployee;
/**
 * Delete an employee by its ID.
 */
const deleteEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, employe_service_1.deleteEmployeeService)(Number(req.params.id));
        response_handler_1.ResponseHandler.success(req, res, 'Employee deleted successfully', 200);
    }
    catch (error) {
        console.error('Error deleting employee:', error);
        response_handler_1.ResponseHandler.failure(req, res, 'An error occurred while deleting the employee', 500, error instanceof Error ? error : undefined);
    }
});
exports.deleteEmployee = deleteEmployee;
/**
 * Search employees based on query parameters.
 */
const searchEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employees = yield (0, employe_service_1.searchEmployeesService)(req.query);
        response_handler_1.ResponseHandler.success(req, res, 'Employees retrieved successfully', 200, employees);
    }
    catch (error) {
        console.error('Error searching employees:', error);
        response_handler_1.ResponseHandler.failure(req, res, 'An error occurred while searching employees', 500, error instanceof Error ? error : undefined);
    }
});
exports.searchEmployees = searchEmployees;
/**
 * Get employees by role ID or name.
 */
const getEmployeeByRoleOrName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { roleId, name } = req.params;
        if (!roleId && !name) {
            response_handler_1.ResponseHandler.failure(req, res, 'Please provide either roleId or name', 400);
            return;
        }
        const employees = yield (0, employe_service_1.getEmployeeByRoleIdOrName)(roleId, name);
        response_handler_1.ResponseHandler.success(req, res, 'Employees retrieved successfully', 200, employees);
    }
    catch (error) {
        logger_1.Logger.instance().log(error instanceof Error ? error.message : String(error));
        response_handler_1.ResponseHandler.failure(req, res, 'An error occurred while retrieving employees', 500, error instanceof Error ? error : undefined);
    }
});
exports.getEmployeeByRoleOrName = getEmployeeByRoleOrName;
