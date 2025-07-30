"use strict";
// src/middlewares/auth.middleware.ts
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
exports.authenticate = void 0;
const jwt_util_1 = require("../utils/jwt.util");
const user_repository_1 = require("../repositories/user.repository");
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({ message: "Authorization token missing or malformed" });
            return;
        }
        const token = authHeader.split(" ")[1];
        const decoded = (0, jwt_util_1.verifyToken)(token);
        const user = yield (0, user_repository_1.getUserById)(decoded.id);
        if (!user) {
            res.status(401).json({ message: "User not found" });
            return;
        }
        if (!user.is_active) {
            res.status(403).json({ message: "User is inactive" });
            return;
        }
        const _user = {
            id: user.id,
            email: user.email,
            organizationId: user.organizationId,
            roleId: user.roleId
        };
        req.user = _user;
        next();
    }
    catch (error) {
        console.error("[AUTH ERROR]", (error === null || error === void 0 ? void 0 : error.message) || error);
        res.status(401).json({ message: "Invalid or expired token" });
    }
});
exports.authenticate = authenticate;
