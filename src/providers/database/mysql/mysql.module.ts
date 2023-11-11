import { ConfigService } from '@config/core';
import { databaseConfig } from '@config/database.config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import {
  addTransactionalDataSource,
  deleteDataSourceByName,
} from 'typeorm-transactional';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory(configService: ConfigService) {
        return configService.get<typeof databaseConfig>('database')!.mysql;
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }
        //Reconfiguring TypeOrm DataSource
        //To be able to utilize transaction passed via AsyncLocalStorage
        const dataSource = new DataSource(options);

        deleteDataSourceByName('default');

        return addTransactionalDataSource(dataSource);

        return dataSource;
      },
      inject: [ConfigService],
    }),
  ],
})
export class MySqlDatabaseModule {}
