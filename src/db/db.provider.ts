/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

console.log('DATABASE_URL =', process.env.DATABASE_URL);
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  max: 10, // IMPORTANT for load behavior
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
export const db = drizzle(pool, { schema });
