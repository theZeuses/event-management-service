import './env';
import { AnyExceptionFilter } from '@common/filters';
import { ValidationPipe } from '@common/pipes';
import { appConfig } from '@config/app.config';
import { ConfigService } from '@config/core';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { AppModule } from './app.module';
import { createLogger } from './logger';

async function bootstrap() {
  const startTime = new Date().toISOString();

  //Needed to initialize AsyncLocalStorage
  //to propagate Transaction across codebase
  //caveat: slight performance toll
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  app.useLogger(createLogger(configService, startTime));

  app.enableCors();
  app.use(helmet());

  app.setGlobalPrefix('v1');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AnyExceptionFilter(app.get(Logger)));

  app.enableShutdownHooks();

  await app.listen(
    app.get<ConfigService>(ConfigService).get<typeof appConfig>('app')!.port,
  );

  console.log(
    `Application running on port ${
      app.get<ConfigService>(ConfigService).get<typeof appConfig>('app')!.port
    }`,
  );
}

bootstrap();
