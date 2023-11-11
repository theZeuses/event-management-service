import { Controller, Get, Param } from '@nestjs/common';
import { EventService } from './event.service';
import { ParsedQuery } from '@common/decorators';
import { makeFindManyOption, makePaginationOption } from '@common/utils';
import { GetQueryDto } from './dto';

@Controller('/events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get('/')
  async get(@ParsedQuery() query: GetQueryDto) {
    return this.eventService.get(
      makeFindManyOption(query),
      makePaginationOption(query),
    );
  }

  @Get('/:id')
  async getOneWithDetails(@Param() id: number) {
    return this.eventService.findOneWithDetails(id);
  }

  @Get('/:id/workshops')
  async getOneWithWorkshops(@Param() id: number) {
    return this.eventService.findOneWithWorkshops(id);
  }
}
