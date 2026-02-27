import { Inject, Injectable } from '@nestjs/common';
import { desc } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as redis from 'redis';

import { DRIZZLE } from '../db/database.module';
import * as schema from '../db/schema';

@Injectable()
export class FeedService {
  constructor(
    @Inject(DRIZZLE)
    private db: NodePgDatabase<typeof schema>,
    @Inject('REDIS_CLIENT') private readonly redisClient: redis.RedisClientType,
  ) {}

  async getLatestFeeds() {
    const cacheKey = `latest_feed`;

    // 1️⃣ Check cache
    const cached: string | null = await this.redisClient.get(cacheKey);
    if (cached) {
      console.log('Cache hit');
      return JSON.parse(cached) as (typeof schema.feed.$inferSelect)[];
    }

    // 2️⃣ Fetch from DB
    const data = await this.db
      .select()
      .from(schema.feed)
      .orderBy(desc(schema.feed.createdAt))
      .limit(10);

    // 3️⃣ Store in Redis
    await this.redisClient.set(cacheKey, JSON.stringify(data), { EX: 60 }); // Cache for 60 seconds
    return data;
  }
}
