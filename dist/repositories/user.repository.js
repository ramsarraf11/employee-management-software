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
exports.getUserById = exports.findUserByIdentifier = exports.createUser = exports.findUserByEmail = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const sequelize_1 = require("sequelize");
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.findOne({ where: { email } });
});
exports.findUserByEmail = findUserByEmail;
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.create(data);
});
exports.createUser = createUser;
const findUserByIdentifier = (identifier) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.findOne({
        where: {
            [sequelize_1.Op.or]: [
                { email: identifier }, // Match by email
                { username: identifier }, // Match by username
            ],
        },
    });
});
exports.findUserByIdentifier = findUserByIdentifier;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.findByPk(id, {
        attributes: { exclude: ['password'] },
        include: ['role', 'organization'], // assuming associations are set
    });
});
exports.getUserById = getUserById;
