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
exports.registerUserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_repository_1 = require("../repositories/user.repository");
const role_model_1 = __importDefault(require("../models/role.model"));
const registerUserService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ name, email, password, roleId, username }) {
    // Check if the role exists
    const role = yield role_model_1.default.findOne({ where: { id: roleId } });
    if (!role) {
        throw new Error('Invalid roleId. Role does not exist.');
    }
    // Hash the password
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    // Create the user
    const newUser = yield (0, user_repository_1.createUser)({
        name,
        email,
        password: hashedPassword,
        roleId,
        username
    });
    return newUser;
});
exports.registerUserService = registerUserService;
