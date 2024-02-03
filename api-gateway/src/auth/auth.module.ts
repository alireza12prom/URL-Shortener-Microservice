import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      useFactory: (config: ConfigService) => {
        return {
          uri: config.get('RABBITMQ_URL'),
          enableControllerDiscovery: false,
          connectionInitOptions: {
            wait: false,
          },
          channels: {
            'apigateway-service-channel': {
              default: true,
              prefetchCount: 10,
            },
          },
          exchanges: [],
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
