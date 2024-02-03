import { ProfileControllerType } from '../interfaces';
import { IsNumber, IsOptional, MaxLength } from 'class-validator';

export class UpdateProfileDto implements ProfileControllerType.IUpdateProfile {
  @IsNumber()
  userId: number;

  @MaxLength(150)
  @IsOptional()
  fname?: string;

  @MaxLength(150)
  @IsOptional()
  lname?: string;
}
