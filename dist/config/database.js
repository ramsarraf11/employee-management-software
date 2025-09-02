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
exports.initializeDB = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const promise_1 = __importDefault(require("mysql2/promise"));
const umzug_1 = require("umzug");
const logger_1 = require("../utils/logger");
// import { onboard }  from '../scripts/onboard-schools';
dotenv_1.default.config();
const DB_HOST = process.env.DB_HOST;
const DB_PORT = Number(process.env.DB_PORT);
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const sequelize = new sequelize_typescript_1.Sequelize({
    dialect: 'mysql',
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    models: [path_1.default.resolve(__dirname, '../models')],
    logging: false,
});
const createDatabaseIfNotExists = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield promise_1.default.createConnection({
            host: DB_HOST,
            port: DB_PORT,
            user: DB_USER,
            password: DB_PASSWORD,
        });
        yield connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
        logger_1.Logger.instance().log(`Database "${DB_NAME}" is ready.`);
        yield connection.end();
    }
    catch (error) {
        console.error('Error creating database:', error);
        process.exit(1);
    }
});
// Function to run seeders
const runSeeders = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const seeder = new umzug_1.Umzug({
            migrations: { glob: 'src/seeders/*.js' },
            context: sequelize.getQueryInterface(),
            storage: new umzug_1.SequelizeStorage({ sequelize, tableName: 'SequelizeSeeders' }),
            logger: console,
        });
        yield seeder.up();
        logger_1.Logger.instance().log('Seeders executed successfully.');
    }
    catch (error) {
        console.error('Error running seeders:', error);
        process.exit(1);
    }
});
const initializeDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield createDatabaseIfNotExists();
        yield sequelize.authenticate();
        logger_1.Logger.instance().log('Database connection has been established successfully.');
        yield sequelize.sync({ alter: true });
        logger_1.Logger.instance().log('All models were synchronized successfully.');
        yield runSeeders();
    }
    catch (error) {
        logger_1.Logger.instance().log(`Unable to initialize the database: ${error}`);
        process.exit(1);
    }
});
exports.initializeDB = initializeDB;
exports.default = sequelize;
