"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_validators_1 = require("../validators/user.validators");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const user_controller_1 = require("../controllers/user.controller");
const userRouter = (0, express_1.Router)();
userRouter.post('/register', auth_middleware_1.authenticate, user_validators_1.validateRegistration, user_controller_1.registerUser);
exports.default = userRouter;
