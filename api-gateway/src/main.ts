import morgan from 'morgan';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import {
  BadRequestException,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FormatResponseInterceptor } from './interceptors';
import { FormatResponseFilter } from './exception-filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Logger
  app.use(morgan('tiny'));

  // Versioning
  app.enableVersioning({
    prefix: 'api/v',
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  // Globals
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      stopAtFirstError: true,
      exceptionFactory: (errors) => {
        const message = Object.values(errors.at(0).constraints).at(0);
        throw new BadRequestException(message);
      },
    }),
  );

  app.useGlobalFilters(new FormatResponseFilter());
  app.useGlobalInterceptors(new FormatResponseInterceptor());

  // Listening
  const config = app.get(ConfigService);
  const PORT = parseInt(config.get('PORT') || '3000');

  app.listen(PORT, () => {
    console.log(`🚀 Application is running on: http://localhost:${PORT}/`);
  });
}
bootstrap();
