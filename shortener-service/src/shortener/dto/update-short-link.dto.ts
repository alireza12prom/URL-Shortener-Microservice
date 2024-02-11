import { ShortenerServiceType } from '../interface';
import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateShortLinksDto
  implements ShortenerServiceType.IUpdateShortLink
{
  @IsNumber()
  userId: number;

  @IsNumber()
  linkId: number;

  @IsUrl({ protocols: ['https', 'http'], require_protocol: true })
  longURL?: string;

  @MaxLength(10)
  @MinLength(5)
  @IsOptional()
  shortURL?: string;

  @IsDateString()
  @IsOptional()
  expireAt?: string;
}
