import { Platform } from '@prisma/client';
import { SessionControllerType } from '../interface';

import {
  IsEnum,
  IsUUID,
  IsLocale,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';

export class CreateSessionDto implements SessionControllerType.ICreateSession {
  @IsNumber()
  userId: number;

  @IsUUID()
  identifier: string;

  @IsEnum(Platform)
  platform: Platform;

  @IsNotEmpty()
  version: string;

  @IsLocale()
  locale: string;
}
