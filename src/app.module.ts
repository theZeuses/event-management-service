import { CommonModule } from '@common/common.module';
import { REQUEST_ID_KEY } from '@common/constants';
import { AppRequestLoggerMiddleware } from '@common/middlewares';
import { GracefulShutdownService, UUIDService } from '@common/services';
import { ConfigModule } from '@config/core';
import { EventModule } from '@modules/event/event.module';
import { ReservationModule } from '@modules/reservation/reservation.module';
import { WorkShopModule } from '@modules/workshop/workshop.module';
import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DatabaseModule } from '@providers/database/database.module';
import { Request } from 'express';
import { ClsModule } from 'nestjs-cls';

@Module({
  imports: [
    ConfigModule,
    CommonModule,
    ClsModule.forRootAsync({
      global: true,
      inject: [UUIDService],
      useFactory(uuidService: UUIDService) {
        return {
          middleware: {
            mount: true,
            generateId: true,
            idGenerator: (req: Request) => {
              return typeof req.headers[REQUEST_ID_KEY] == 'string'
                ? req.headers[REQUEST_ID_KEY]
                : uuidService.uuid();
            },
          },
        };
      },
    }),
    DatabaseModule,
    EventModule,
    WorkShopModule,
    ReservationModule,
  ],
  providers: [Logger, GracefulShutdownService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppRequestLoggerMiddleware).exclude().forRoutes('*');
  }
}
