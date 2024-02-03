import { Response } from 'express';

import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class FormatResponseFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const code = exception.getStatus();
    const reason = exception.message;

    response.status(code).json({
      status: 'error',
      reason: reason,
    });
  }
}
