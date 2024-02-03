import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ProfileRepository } from './repository';
import { PrismaService } from 'src/prisma.service';
import { ProfileController } from './profile.controller';
import { ProfileService, HashService } from './services';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

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
            'profile-service-channel': {
              default: true,
              prefetchCount: 10,
            },
          },
          exchanges: [
            {
              name: 'profile-service',
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
  controllers: [ProfileController],
  providers: [
    ProfileController,
    {
      provide: 'ProfileRepository',
      useClass: ProfileRepository,
    },
    {
      provide: 'HashService',
      useClass: HashService,
    },
    {
      provide: 'ProfileService',
      useClass: ProfileService,
    },
    PrismaService,
  ],
})
export class ProfileModule {}
