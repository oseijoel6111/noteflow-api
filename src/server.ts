import app from './app';
import {ENV} from './config';
import log from './utils/logger';


app.listen(ENV.PORT, () => {
    log.info(`Server is running on port ${ENV.PORT} in ${ENV.NODE_ENV} mode`);
});