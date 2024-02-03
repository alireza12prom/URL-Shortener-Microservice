import { map } from 'rxjs';
import { Response } from 'express';

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

@Injectable()
export class FormatResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    const now = Date.now();
    const response = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      map((data) => {
        const body = data ? data : {};
        const code = response.statusCode;
        const time = Date.now() - now;

        response.status(code).json({
          status: 'success',
          time,
          ...body,
        });
      }),
    );
  }
}
