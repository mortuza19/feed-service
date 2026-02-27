import { pgTable, serial, text, timestamp, index } from 'drizzle-orm/pg-core';

export const feed = pgTable(
  'feed',
  {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    content: text('content').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => [index('created_at_idx').on(table.createdAt)],
);
