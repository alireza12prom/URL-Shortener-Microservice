import { IsNumber } from 'class-validator';
import { SessionControllerType } from '../interface';

export class ListSessionDto implements SessionControllerType.IListSessions {
  @IsNumber()
  userId: number;
}
