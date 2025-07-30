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
exports.registerUser = void 0;
const user_services_1 = require("../services/user.services");
const response_util_1 = require("../utils/response.util");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, roleId, username } = req.body;
        const newUser = yield (0, user_services_1.registerUserService)({ name, email, password, roleId, username });
        (0, response_util_1.handleSuccess)(res, 'User registered successfully', newUser);
    }
    catch (error) {
        if (error instanceof Error) {
            (0, response_util_1.handleFailure)(res, error.message, 400);
        }
        else {
            (0, response_util_1.handleFailure)(res, 'An unknown error occurred', 400);
        }
    }
});
exports.registerUser = registerUser;
