import { Module } from '@nestjs/common';
import { ShortenerService } from './shortener.service';
import { ShortenerController } from './shortener.controller';
import { LinkRepository } from './repository';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      useFactory: (config: ConfigService) => {
        return {
          uri: config.get('RABBITMQ_URL'),
          enableControllerDiscovery: true,
          connectionInitOptions: {
            wait: false,
          },
          channels: {
            'shortener-service-channel': {
              default: true,
              prefetchCount: 10,
            },
          },
          exchanges: [
            {
              name: 'shortener-service',
              createExchangeIfNotExists: true,
              type: 'topic',
              options: {},
            },
          ],
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [ShortenerController],
  providers: [
    {
      provide: 'SHORTENER_SERVICE',
      useClass: ShortenerService,
    },
    {
      provide: 'LINK_REPOSITORY',
      useClass: LinkRepository,
    },
    PrismaService,
  ],
})
export class ShortenerModule {}
