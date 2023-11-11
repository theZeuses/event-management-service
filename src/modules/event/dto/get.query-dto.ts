import { IsNumber, IsOptional } from 'class-validator';

export class GetQueryDto {
  @IsNumber()
  @IsOptional()
  limit?: number;

  @IsNumber()
  @IsOptional()
  page?: number;
}
