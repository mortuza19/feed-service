import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeedController } from './feed/feed.controller';
import { FeedService } from './feed/feed.service';
import { DatabaseModule } from './db/database.module';
import { RedisProvider } from './redis.provider';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
  ],
  controllers: [AppController, FeedController],
  providers: [AppService, RedisProvider, FeedService],
  exports: ['REDIS_CLIENT'],
})
export class AppModule {}
