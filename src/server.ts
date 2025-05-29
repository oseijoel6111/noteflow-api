import app from './app';
import { ENV } from './config';
import logger from './utils/logger';
import { AppDataSource } from './config'


AppDataSource.initialize().then(() => {
    logger.info("🟢 Database connected")
    app.listen(ENV.PORT, () => {
        logger.info(`🚀 Server is running on port ${ENV.PORT} in ${ENV.NODE_ENV} mode`);
    });
}).catch((error) => {
    logger.error('🔴 Error connecting to the database:', error);
    process.exit(1); // Exit the process with failure
});