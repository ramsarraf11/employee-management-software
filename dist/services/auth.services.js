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
exports.loginService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_util_1 = require("../utils/jwt.util");
const user_repository_1 = require("../repositories/user.repository");
/**
 * Authenticate a user by username or email and password
 * @param identifier - The username or email of the user
 * @param password - The user's password
 * @returns A JWT token if authentication is successful
 */
const loginService = (identifier, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_repository_1.findUserByIdentifier)(identifier);
        if (!user) {
            throw new Error('Invalid username/email or password');
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }
        const token = (0, jwt_util_1.generateToken)({ id: user.id, email: user.email, username: user.username, roleId: user.roleId });
        return token;
    }
    catch (error) {
        console.error('Error during login:', error);
    }
});
exports.loginService = loginService;
