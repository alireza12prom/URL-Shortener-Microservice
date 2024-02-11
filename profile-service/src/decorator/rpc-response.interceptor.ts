import { Message } from 'amqplib';
import { Observable, catchError, map } from 'rxjs';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { RabbitRpcException } from 'src/common/rabbit-rpc-exception';

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';

@Injectable()
export class RPCResponseInterceptor implements NestInterceptor {
  constructor(public readonly amqp: AmqpConnection) {}

  intercept(context: ExecutionContext, next: CallHandler<any>) {
    const channel = this.amqp.channel;
    const rpc = context.switchToRpc().getContext() as Message;
    const { appId, replyTo, correlationId, messageId, userId } = rpc.properties;

    console.log(rpc.content.toString());
    return next.handle().pipe(
      map((data) => {
        data = JSON.stringify({ status: 'success', ...data });

        channel.sendToQueue(replyTo, Buffer.from(data), {
          contentType: 'application/json',
          contentEncoding: 'utf8',
          userId,
          appId,
          correlationId,
          messageId,
          timestamp: new Date().getTime(),
        });
      }),
      catchError((err: RabbitRpcException) => {
        return new Observable(() => {
          const data = JSON.stringify({ status: 'error', ...err?.getError() });

          channel.sendToQueue(replyTo, Buffer.from(data), {
            contentType: 'application/json',
            contentEncoding: 'utf8',
            userId,
            appId,
            correlationId,
            messageId,
            timestamp: new Date().getTime(),
          });
        });
      }),
    );
  }
}
