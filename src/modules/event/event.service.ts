import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, MoreThan, Repository } from 'typeorm';
import { EventEntity } from './entities/event.entity';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Exception } from '@common/constants';
import { WorkShopService } from '@modules/workshop/workshop.service';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
    private readonly workShopService: WorkShopService,
  ) {}

  async get(
    findManyOption?: FindManyOptions<EventEntity>,
    paginationOptions: IPaginationOptions = {
      limit: 0,
      page: 1,
    },
  ) {
    if (!findManyOption) findManyOption = {};

    findManyOption.where = {
      ...findManyOption?.where,
      start_at: MoreThan(new Date()),
    };
    const result = await paginate(
      this.eventRepository,
      paginationOptions,
      findManyOption,
    );

    return {
      events: result.items,
      pagination: result.meta,
    };
  }

  async findOneWithDetails(id: number) {
    const event = await this.eventRepository.findOneBy({
      id,
    });

    if (!event)
      throw new NotFoundException(Exception.NotFoundException.ENTITY_NOT_FOUND);

    const relatedWorkShopCount = await this.workShopService.countByEventId(id);

    return {
      ...event,
      total_workshops: relatedWorkShopCount,
    };
  }

  async findOneWithWorkshops(id: number) {
    const event = await this.eventRepository.findOne({
      where: {
        id,
      },
    });

    if (!event)
      throw new NotFoundException(Exception.NotFoundException.ENTITY_NOT_FOUND);

    const relatedWorkShops = await this.workShopService.getByEventId(id);

    return {
      ...event,
      workshops: relatedWorkShops,
    };
  }
}
