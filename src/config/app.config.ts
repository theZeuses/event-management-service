import { registerAs } from '@nestjs/config';

export const appConfig = {
  port: process.env.PORT || 3000,
  env: process.env.ENV || 'development',
} as const;

export default registerAs('app', (): typeof appConfig => appConfig);
