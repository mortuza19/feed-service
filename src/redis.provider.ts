import { createClient } from 'redis';
export const RedisProvider = {
  provide: 'REDIS_CLIENT',
  useFactory: async () => {
    const client = createClient({
      username: process.env.REDIS_USERNAME || 'default',
      password: process.env.REDIS_PASSWORD,
      socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT || '12059'),
      },
    });

    client.on('error', (err) => console.log('Redis Client Error', err));

    await client.connect(); // IMPORTANT

    return client;
  },
};
