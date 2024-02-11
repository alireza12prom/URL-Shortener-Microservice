import {
  IsUrl,
  IsNumber,
  MinLength,
  MaxLength,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { ShortenerServiceType } from '../interface';

export class CreateShortLinkDto
  implements ShortenerServiceType.ICreateShortLink
{
  @IsNumber()
  userId: number;

  @IsUrl({ protocols: ['https', 'http'], require_protocol: true })
  longURL: string;

  @MaxLength(10)
  @MinLength(5)
  @IsOptional()
  shortURL?: string;

  @IsDateString()
  @IsOptional()
  expireAt?: string;
}
