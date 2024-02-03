import { IsHexadecimal, IsNumber } from 'class-validator';
import { SessionControllerType } from '../interface';

export class UpdateSessionDto implements SessionControllerType.IUpdate {
  @IsNumber()
  sessionId: number;

  @IsHexadecimal()
  hash?: string;
}
