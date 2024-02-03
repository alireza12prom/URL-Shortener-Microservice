import { IsNumber } from 'class-validator';
import { SessionControllerType } from '../interface';

export class DiscardSessionDto
  implements SessionControllerType.IDiscardSession
{
  @IsNumber()
  userId: number;

  @IsNumber()
  sessionId: number;
}
