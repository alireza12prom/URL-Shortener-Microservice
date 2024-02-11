import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SessionRepository } from './repository';
import { PrismaService } from '../prisma.service';
import { SessionController } from './session.controller';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { SessionService } from './session.service';

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
            'session-service-channel': {
              default: true,
              prefetchCount: 10,
            },
          },
          exchanges: [
            {
              name: 'session-service',
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
  controllers: [SessionController],
  providers: [
    SessionController,
    {
      provide: 'SESSION_SERVICE',
      useClass: SessionService,
    },
    {
      provide: 'SESSION_REPOSITORY',
      useClass: SessionRepository,
    },
    PrismaService,
  ],
})
export class SessionModule {}
