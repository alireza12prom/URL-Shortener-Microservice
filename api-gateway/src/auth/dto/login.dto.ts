import { AuthControllerType } from '../interfaces';
import { IsEnum, IsLocale, IsNotEmpty, IsUUID } from 'class-validator';

export class LoginDto implements AuthControllerType.ILogin {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsUUID()
  identifier: string;

  @IsEnum(AuthControllerType.Platform)
  platform: AuthControllerType.Platform;

  @IsNotEmpty()
  version: string;

  @IsLocale()
  locale: string;
}
