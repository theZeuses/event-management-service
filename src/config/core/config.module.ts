import { Global, Module } from '@nestjs/common';
import { ConfigModule as ConfigModuleRoot } from '@nestjs/config';
import { ConfigService } from './config.service';
import appConfig from '../app.config';
import databaseConfig from '../database.config';

@Global()
@Module({
  imports: [
    ConfigModuleRoot.forRoot({
      load: [appConfig, databaseConfig],
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
