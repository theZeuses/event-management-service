import { appConfig } from '../app.config';
import { databaseConfig } from '../database.config';

export interface ConfigInterface {
  app: typeof appConfig;
  database: typeof databaseConfig;
}
