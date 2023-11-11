import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WorkShopService } from './workshop.service';
import { ReserveOneDto } from './dto';

@Controller('/workshops')
export class WorkShopController {
  constructor(private readonly workShopService: WorkShopService) {}

  @Get('/:id')
  async getOneWithDetails(@Param('id') id: number) {
    return this.workShopService.findOneWithDetails(id);
  }

  @Post('/:id/reserve')
  async reserveOne(@Param('id') id: number, @Body() body: ReserveOneDto) {
    return this.workShopService.reserveOne(id, body);
  }
}
