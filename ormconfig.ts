import 'src/env';
import { databaseConfig } from './src/config/database.config';
import { DataSource, DataSourceOptions } from 'typeorm';

export const AppDatasource = new DataSource({
    ...databaseConfig.mysql,
    seeders: [__dirname + '/database/seeders/*'],
    factories: [__dirname + '/database/factories/*'],
} as unknown as DataSourceOptions);