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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchEmployees = exports.deleteEmployee = exports.updateEmployee = exports.getEmployeeById = exports.createEmployee = void 0;
const employee_model_1 = __importDefault(require("../models/employee.model"));
const sequelize_1 = require("sequelize");
/////////////////////////////
const createEmployee = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield employee_model_1.default.create(data);
});
exports.createEmployee = createEmployee;
const getEmployeeById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield employee_model_1.default.findByPk(id);
});
exports.getEmployeeById = getEmployeeById;
const updateEmployee = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const employee = yield employee_model_1.default.findByPk(id);
    if (!employee)
        throw new Error('Employee not found');
    return yield employee.update(data);
});
exports.updateEmployee = updateEmployee;
const deleteEmployee = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const employee = yield employee_model_1.default.findByPk(id);
    if (!employee)
        throw new Error('Employee not found');
    return yield employee.destroy();
});
exports.deleteEmployee = deleteEmployee;
const searchEmployees = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const whereClause = {};
    if (query.role) {
        whereClause.roleId = query.role;
    }
    if (query.name) {
        // Search by firstName or lastName containing the name substring (case-insensitive)
        whereClause[sequelize_1.Op.or] = [
            { firstName: { [sequelize_1.Op.iLike]: `%${query.name}%` } },
            { lastName: { [sequelize_1.Op.iLike]: `%${query.name}%` } },
        ];
    }
    return yield employee_model_1.default.findAll({
        where: whereClause,
    });
});
exports.searchEmployees = searchEmployees;
