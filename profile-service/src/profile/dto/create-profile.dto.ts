import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { ProfileControllerType } from '../interfaces';

export class CreateProfileDto implements ProfileControllerType.ICreateProfile {
  @MaxLength(150)
  @IsNotEmpty()
  fname: string;

  @MaxLength(150)
  @IsNotEmpty()
  lname: string;

  @IsEmail({ host_whitelist: ['gmail.com', 'yahoo.com'] })
  email: string;

  @MaxLength(15)
  @MinLength(8)
  password: string;
}
