import { IsNumber, Min } from 'class-validator';
import { ShortenerServiceType } from '../interface';

export class ListShortLinksDto implements ShortenerServiceType.IListShortLinks {
  @IsNumber()
  userId: number;

  @Min(1)
  @IsNumber()
  page: number;

  @Min(10)
  @IsNumber()
  limit: number;
}
