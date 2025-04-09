import logger, { setMode, createLogger, type ILogger } from '@zajno/common/logger';
import { AppConfig } from 'scripts/utils/config';

setMode(AppConfig.EnableLogger ? 'console' : false);

export default logger;

logger.log(AppConfig.FullVersionName);

export { createLogger };

export type { ILogger };
