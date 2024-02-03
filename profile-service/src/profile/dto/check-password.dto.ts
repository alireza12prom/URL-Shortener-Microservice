import { IsNotEmpty, IsNumber } from 'class-validator';
import { ProfileControllerType } from '../interfaces';

export class CheckPasswordDto implements ProfileControllerType.ICheckPassword {
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  password: string;
}
