"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const error_middleware_1 = require("./middlewares/error.middleware");
const indexRoutes_1 = require("./routes/indexRoutes");
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = require("./utils/logger");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const method_override_1 = __importDefault(require("method-override"));
dotenv_1.default.config();
const express_session_1 = __importDefault(require("express-session"));
const connect_flash_1 = __importDefault(require("connect-flash"));
const app = (0, express_1.default)();
exports.app = app;
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'views'));
app.use((0, method_override_1.default)('_method'));
logger_1.Logger.instance().log('Starting server...');
app.use((0, express_session_1.default)({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));
app.use((0, connect_flash_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
app.get(`/`, (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is healthy' });
});
(0, indexRoutes_1.initializeRoutes)(app);
app.use(error_middleware_1.globalErrorHandler);
