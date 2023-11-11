import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkShopEntity } from './entities/workshop.entity';
import { WorkShopService } from './workshop.service';
import { WorkShopController } from './workshop.controller';
import { ReservationModule } from '@modules/reservation/reservation.module';

@Module({
  imports: [TypeOrmModule.forFeature([WorkShopEntity]), ReservationModule],
  providers: [WorkShopService],
  controllers: [WorkShopController],
  exports: [WorkShopService],
})
export class WorkShopModule {}
