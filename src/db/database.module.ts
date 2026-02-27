/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import * as schema from './schema';

export const DRIZZLE = 'DRIZZLE';

@Module({
  providers: [
    {
      provide: DRIZZLE,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const pool: Pool = new Pool({
          connectionString: configService.get<string>('DATABASE_URL'),
          ssl: {
            rejectUnauthorized: false,
          },
          max: 10,
        });

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        return drizzle(pool, { schema });
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DatabaseModule {}
