import { mustBeStringOrFail } from '@common/utils';
import { registerAs } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

export const databaseConfig: {
  mysql: DataSourceOptions;
} = {
  mysql: {
    host: process.env.DATABASE_HOST,
    port: ~~mustBeStringOrFail(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    type: 'mysql',
    entities: [__dirname + '/../modules/**/entities/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../database/migrations/*'],
    synchronize: false,
    logging: true,
  },
};

export default registerAs(
  'database',
  (): typeof databaseConfig => databaseConfig,
);
