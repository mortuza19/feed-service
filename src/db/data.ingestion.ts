import 'dotenv/config';
import { db } from './db.provider';
import { feed } from './schema';

async function seed() {
  console.log('Seeding started...');

  const batchSize = 1000;

  for (let i = 0; i < 50000; i += batchSize) {
    const values = Array.from({ length: batchSize }, (_, index) => ({
      title: `News ${i + index}`,
      content: `Content ${i + index}`,
    }));

    await db.insert(feed).values(values);
    console.log(`Inserted ${i + batchSize}`);
  }

  console.log('Seeding completed');
  process.exit(0);
}

void seed();
