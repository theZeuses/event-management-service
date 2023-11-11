import { Injectable } from '@nestjs/common';
import { ConfigService as ConfigServiceRoot } from '@nestjs/config';
import { ConfigInterface } from './config.interface';
import { appConfig } from '../app.config';

@Injectable()
export class ConfigService extends ConfigServiceRoot<ConfigInterface> {
  isProduction() {
    return this.get<typeof appConfig>('app')!.env === 'production';
  }
}
