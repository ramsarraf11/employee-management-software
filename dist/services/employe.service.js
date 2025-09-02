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
exports.getEmployeeByRoleIdOrName = exports.searchEmployeesService = exports.deleteEmployeeService = exports.updateEmployeeService = exports.getEmployeeByIdService = exports.createEmployeeService = void 0;
const employee_repository_1 = require("../repositories/employee.repository");
const createEmployeeService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, employee_repository_1.createEmployee)(data);
});
exports.createEmployeeService = createEmployeeService;
const getEmployeeByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, employee_repository_1.getEmployeeById)(id);
});
exports.getEmployeeByIdService = getEmployeeByIdService;
const updateEmployeeService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, employee_repository_1.updateEmployee)(id, data);
});
exports.updateEmployeeService = updateEmployeeService;
const deleteEmployeeService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, employee_repository_1.deleteEmployee)(id);
});
exports.deleteEmployeeService = deleteEmployeeService;
const searchEmployeesService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, employee_repository_1.searchEmployees)(query);
});
exports.searchEmployeesService = searchEmployeesService;
const getEmployeeByRoleIdOrName = (roleId, name) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, employee_repository_1.searchEmployees)({ role: roleId, name });
});
exports.getEmployeeByRoleIdOrName = getEmployeeByRoleIdOrName;
