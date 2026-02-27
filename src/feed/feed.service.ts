import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE } from '../db/database.module';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../db/schema';
import { desc } from 'drizzle-orm';

@Injectable()
export class FeedService {
  constructor(
    @Inject(DRIZZLE)
    private db: NodePgDatabase<typeof schema>,
  ) {}

  async getLatestFeeds() {
    return this.db
      .select()
      .from(schema.feed)
      .orderBy(desc(schema.feed.createdAt))
      .limit(10);
  }
}
