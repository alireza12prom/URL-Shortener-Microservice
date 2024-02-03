import { IsEmail, IsNumber, IsOptional } from 'class-validator';
import { ProfileControllerType } from '../interfaces';

export class GetProfileDto implements ProfileControllerType.IGetProfile {
  @IsNumber()
  @IsOptional()
  userId?: number;

  @IsEmail()
  @IsOptional()
  email?: string;
}
