import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReservationEntity } from './entities/reservation.entity';
import { Exception } from '@common/constants';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(ReservationEntity)
    private readonly reservationRepository: Repository<ReservationEntity>,
  ) {}

  async get() {
    return this.reservationRepository.find();
  }

  async getOneWithDetails(id: number) {
    const reservation = await this.reservationRepository.findOneBy({
      id,
    });

    if (!reservation)
      throw new NotFoundException(Exception.NotFoundException.ENTITY_NOT_FOUND);
  }

  async getByWorkShopId(workshop_id: number) {
    return this.reservationRepository.findBy({
      workshop_id,
    });
  }

  async countByWorkShopId(workshop_id: number) {
    return this.reservationRepository.countBy({
      workshop_id,
    });
  }

  async insertOne(dto: { workshop_id: number; name: string; email: string }) {
    return this.reservationRepository.save(dto);
  }
}
