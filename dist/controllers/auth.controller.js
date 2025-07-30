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
exports.login = void 0;
const auth_services_1 = require("../services/auth.services");
const response_handler_1 = require("../utils/response.handler");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body.email || req.body.username;
        const password = req.body.password;
        const identifier = data.trim().toLowerCase();
        const token = yield (0, auth_services_1.loginService)(identifier, password);
        if (!token) {
            response_handler_1.ResponseHandler.failure(req, res, 'Invalid username/email or password', 401);
            return;
        }
        response_handler_1.ResponseHandler.success(req, res, 'Login successful', 200, { token });
    }
    catch (error) {
        console.error('Error during login:', error);
        response_handler_1.ResponseHandler.failure(req, res, 'An error occurred during login', 500, error instanceof Error ? error : undefined);
    }
});
exports.login = login;
