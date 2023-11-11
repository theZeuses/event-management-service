import { ConfigService } from '@config/core';
import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import winston from 'winston';

export const createLogger = (
  configService: ConfigService,
  serverStartTime: string,
) => {
  return WinstonModule.createLogger({
    format: winston.format.uncolorize(),
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.ms(),
          nestWinstonModuleUtilities.format.nestLike(),
        ),
      }),
      new winston.transports.File({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.ms(),
          nestWinstonModuleUtilities.format.nestLike(undefined, {
            colors: false,
          }),
        ),
        filename: 'combined.log',
      }),
    ],
  });
};
