"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegistration = void 0;
const joi_1 = __importDefault(require("joi"));
const registrationSchema = joi_1.default.object({
    name: joi_1.default.string().max(50).required().messages({
        'string.empty': 'Name is required.',
        'string.max': 'Name must not exceed 50 characters.',
    }),
    email: joi_1.default.string().email().max(100).required().messages({
        'string.empty': 'Email is required.',
        'string.email': 'Email must be a valid email address.',
        'string.max': 'Email must not exceed 100 characters.',
    }),
    username: joi_1.default.string().max(50).required().messages({
        'string.empty': 'Username is required.',
        'string.max': 'Username must not exceed 50 characters.',
    }),
    password: joi_1.default.string().min(8).max(255).required().messages({
        'string.empty': 'Password is required.',
        'string.min': 'Password must be at least 8 characters long.',
        'string.max': 'Password must not exceed 255 characters.',
    }),
    roleId: joi_1.default.number().integer().required().messages({
        'number.base': 'Role ID must be a number.',
        'any.required': 'Role ID is required.',
    }),
    organizationId: joi_1.default.number().integer().optional().messages({
        'number.base': 'Organization ID must be a number.',
    }),
});
const validateRegistration = (req, res, next) => {
    const { error } = registrationSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessages = error.details.map((detail) => detail.message);
        res.status(400).json({ message: 'Validation failed', errors: errorMessages });
        return;
    }
    next();
};
exports.validateRegistration = validateRegistration;
