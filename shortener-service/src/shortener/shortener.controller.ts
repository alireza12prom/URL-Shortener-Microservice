import { Controller, Inject } from '@nestjs/common';
import { IShortenerService } from './interface';
import { RabbitPayload, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import {
  CreateShortLinkDto,
  ListShortLinksDto,
  UpdateShortLinksDto,
} from './dto';

@Controller()
export class ShortenerController {
  constructor(
    @Inject('SHORTENER_SERVICE')
    private readonly shortenerService: IShortenerService,
  ) {}

  @RabbitSubscribe({
    allowNonJsonMessages: false,
    queue: 'create-short-link',
    exchange: 'shortener-service',
    routingKey: 'user.short-link.create',
    createQueueIfNotExists: true,
    queueOptions: {
      arguments: {
        'x-queue-type': 'quorum',
      },
    },
  })
  async createShortLink(@RabbitPayload() payload: CreateShortLinkDto) {
    const result = await this.shortenerService.create(payload);
    return { data: result };
  }

  @RabbitSubscribe({
    allowNonJsonMessages: false,
    queue: 'update-short-link',
    exchange: 'shortener-service',
    routingKey: 'user.short-link.update',
    createQueueIfNotExists: true,
    queueOptions: {
      arguments: {
        'x-queue-type': 'quorum',
      },
    },
  })
  async updateShortLink(@RabbitPayload() payload: UpdateShortLinksDto) {
    const result = await this.shortenerService.update(payload);
    return { data: result };
  }

  @RabbitSubscribe({
    allowNonJsonMessages: false,
    queue: 'list-short-link',
    exchange: 'shortener-service',
    routingKey: 'user.short-link.list',
    createQueueIfNotExists: true,
    queueOptions: {
      arguments: {
        'x-queue-type': 'quorum',
      },
    },
  })
  async listShortLink(@RabbitPayload() payload: ListShortLinksDto) {
    const result = await this.shortenerService.list(payload);
    return { data: result };
  }
}
