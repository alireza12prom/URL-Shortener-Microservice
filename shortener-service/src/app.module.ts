import { Module } from '@nestjs/common';
import { ShortenerModule } from './shortener/shortener.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ShortenerModule,
  ],
})
export class AppModule {}
