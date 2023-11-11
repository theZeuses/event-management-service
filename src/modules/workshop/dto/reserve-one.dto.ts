import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ReserveOneDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
