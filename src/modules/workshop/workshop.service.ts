import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { WorkShopEntity } from './entities/workshop.entity';
import { Exception } from '@common/constants';
import { ReservationService } from '@modules/reservation/reservation.service';
import { ReserveOneDto } from './dto';
import { ForbiddenException } from '@common/exceptions';

@Injectable()
export class WorkShopService {
  constructor(
    @InjectRepository(WorkShopEntity)
    private readonly workShopRepository: Repository<WorkShopEntity>,
    private readonly reservationService: ReservationService,
  ) {}

  async get() {
    return this.workShopRepository.find();
  }

  async findOneWithDetails(id: number) {
    const workshop = await this.workShopRepository.findOneBy({
      id,
    });

    if (!workshop)
      throw new NotFoundException(Exception.NotFoundException.ENTITY_NOT_FOUND);

    const relatedWorkShopCount =
      await this.reservationService.countByWorkShopId(id);

    return {
      ...workshop,
      total_reservations: relatedWorkShopCount,
    };
  }

  async getByEventId(event_id: number) {
    return this.workShopRepository.findBy({
      event_id,
      start_at: MoreThan(new Date()),
    });
  }

  async countByEventId(event_id: number) {
    return this.workShopRepository.countBy({
      event_id,
    });
  }

  async reserveOne(id: number, dto: ReserveOneDto) {
    const workshop = await this.workShopRepository.findOne({
      where: {
        id,
      },
      relations: {
        event: true,
      },
    });
    console.log(workshop);
    if (!workshop)
      throw new ForbiddenException(Exception.ForbiddenException.NOT_FOUND);

    const reservation = await this.reservationService.insertOne({
      ...dto,
      workshop_id: workshop.id,
    });

    const { event, ...workshopWithoutEvent } = workshop;

    return {
      reservation,
      event,
      workshop: workshopWithoutEvent,
    };
  }
}
