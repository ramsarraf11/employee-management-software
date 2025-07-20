import dotenv from 'dotenv';
dotenv.config();
import { app } from './app';
import { initializeDB } from './config/database';
import { Logger } from './utils/logger';

const PORT = Number(process.env.PORT);

const startServer = async () => {
    try {
        await initializeDB();
        Logger.instance().log('Database connected successfully!');

        app.listen(PORT, '0.0.0.0', () => {
            Logger.instance().log(`🚀 Server is running at http://localhost:${PORT}`);
        });

        // Graceful shutdown signals
        process.on('SIGINT', () => {
            Logger.instance().log('👋 SIGINT received. Shutting down gracefully...');
            process.exit(0);
        });

        process.on('exit', code => {
            Logger.instance().log(`👋 Process exited with code: ${code}`);
        });

        // Unhandled Promise Rejections
        process.on('unhandledRejection', (reason, promise) => {
            Logger.instance().log('⚠️ Unhandled Rejection!');
            promise.catch(error => {
                Logger.instance().log(`💥 Rejection reason: ${error?.message}`);
            });
        });

        // Uncaught Exceptions
        process.on('uncaughtException', (error) => {
            Logger.instance().log('💥 Uncaught Exception!');
            Logger.instance().log(`❌ ${error.message}`);
        });

    } catch (error: any) {
        Logger.instance().log(`❌ Failed to start server: ${error.message}`);
    }
};

startServer();