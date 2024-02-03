import { RPCResponseInterceptor } from 'libs/decorator';
import {
  CreateSessionDto,
  DiscardSessionDto,
  ListSessionDto,
  UpdateSessionDto,
} from './dtos';
import { Controller, Inject, UseInterceptors } from '@nestjs/common';

import {
  ISessionController,
  ISessionService,
  SessionControllerType,
} from './interface';

import {
  AmqpConnection,
  RabbitPayload,
  RabbitSubscribe,
} from '@golevelup/nestjs-rabbitmq';

@Controller()
export class SessionController implements ISessionController {
  constructor(
    @Inject('SESSION_SERVICE')
    private readonly sessionService: ISessionService,
    public readonly amqp: AmqpConnection,
  ) {}

  @RabbitSubscribe({
    allowNonJsonMessages: false,
    queue: 'create-session',
    exchange: 'session-service',
    routingKey: 'user.session.create',
    createQueueIfNotExists: true,
    queueOptions: {
      arguments: {
        'x-queue-type': 'quorum',
      },
    },
  })
  @UseInterceptors(RPCResponseInterceptor)
  async create(@RabbitPayload() message: CreateSessionDto) {
    const result = await this.sessionService.create(message);
    return { data: result };
  }

  @RabbitSubscribe({
    allowNonJsonMessages: false,
    queue: 'discard-session',
    exchange: 'session-service',
    routingKey: 'user.session.discard',
    createQueueIfNotExists: true,
    queueOptions: {
      arguments: {
        'x-queue-type': 'quorum',
      },
      messageTtl: 15000,
    },
  })
  @UseInterceptors(RPCResponseInterceptor)
  async discard(@RabbitPayload() message: DiscardSessionDto) {
    const result = await this.sessionService.discard(message);
    return { data: result };
  }

  @RabbitSubscribe({
    allowNonJsonMessages: false,
    queue: 'list-session',
    exchange: 'session-service',
    routingKey: 'user.session.list',
    createQueueIfNotExists: true,
    queueOptions: {
      arguments: {
        'x-queue-type': 'quorum',
      },
      messageTtl: 20000,
    },
  })
  @UseInterceptors(RPCResponseInterceptor)
  async list(@RabbitPayload() message: ListSessionDto) {
    const result = await this.sessionService.list(message);
    return { data: result };
  }

  @RabbitSubscribe({
    allowNonJsonMessages: false,
    queue: 'update-session',
    exchange: 'session-service',
    routingKey: 'user.session.update',
    createQueueIfNotExists: true,
    queueOptions: {
      arguments: {
        'x-queue-type': 'quorum',
      },
      messageTtl: 20000,
    },
  })
  @UseInterceptors(RPCResponseInterceptor)
  async update(@RabbitPayload() message: UpdateSessionDto) {
    const result = await this.sessionService.update(message);
    return { data: result };
  }
}
