import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from './entities/event.entity';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { WorkShopModule } from '@modules/workshop/workshop.module';

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity]), WorkShopModule],
  providers: [EventService],
  controllers: [EventController],
})
export class EventModule {}
