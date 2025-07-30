"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.employeeSchema = joi_1.default.object({
    employeeNumber: joi_1.default.string().required(),
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    panNumber: joi_1.default.string().required(),
    aadhaar: joi_1.default.string().optional(),
    roleId: joi_1.default.string().required(),
    departmentId: joi_1.default.string().required(),
    designationId: joi_1.default.string().required(),
    gender: joi_1.default.string().valid('Male', 'Female', 'Other').required(),
    email: joi_1.default.string().email().required(),
    dateOfBirth: joi_1.default.date().required(),
    dateOfJoining: joi_1.default.date().required(),
    bloodGroup: joi_1.default.string().optional(),
    contactNumber: joi_1.default.string().required(),
    education: joi_1.default.string().optional(),
    assignShift: joi_1.default.string().optional(),
    address: joi_1.default.string().optional(),
    profilePhotoUrl: joi_1.default.string().optional(),
    employmentType: joi_1.default.string().valid('Permanent', 'Contract', 'Temporary').required(),
    basicPay: joi_1.default.number().required(),
    ItDeclarationPerYear: joi_1.default.number().optional(),
    netAmount: joi_1.default.number().required(),
    allowanceDA: joi_1.default.number().optional(),
    allowanceHRA: joi_1.default.number().optional(),
    deductionPTax: joi_1.default.number().optional(),
    organizationId: joi_1.default.number().optional(),
});
