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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = require("./app");
const database_1 = require("./config/database");
const logger_1 = require("./utils/logger");
const PORT = Number(process.env.PORT);
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, database_1.initializeDB)();
        logger_1.Logger.instance().log('Database connected successfully!');
        app_1.app.listen(PORT, '0.0.0.0', () => {
            logger_1.Logger.instance().log(`🚀 Server is running at http://localhost:${PORT}`);
        });
        // Graceful shutdown signals
        process.on('SIGINT', () => {
            logger_1.Logger.instance().log('👋 SIGINT received. Shutting down gracefully...');
            process.exit(0);
        });
        process.on('exit', code => {
            logger_1.Logger.instance().log(`👋 Process exited with code: ${code}`);
        });
        // Unhandled Promise Rejections
        process.on('unhandledRejection', (reason, promise) => {
            logger_1.Logger.instance().log('⚠️ Unhandled Rejection!');
            promise.catch(error => {
                logger_1.Logger.instance().log(`💥 Rejection reason: ${error === null || error === void 0 ? void 0 : error.message}`);
            });
        });
        // Uncaught Exceptions
        process.on('uncaughtException', (error) => {
            logger_1.Logger.instance().log('💥 Uncaught Exception!');
            logger_1.Logger.instance().log(`❌ ${error.message}`);
        });
    }
    catch (error) {
        logger_1.Logger.instance().log(`❌ Failed to start server: ${error.message}`);
    }
});
startServer();
