
## Description

This repository contains a **NestJS service** used to demonstrate how **Redis can be leveraged
as a caching layer** to optimize database queries and reduce bottlenecks. The goal of the
application is to compare response times for feed-related data when fetched from a relational
database alone versus using Redis for caching frequently accessed results.

The codebase includes a simple `FeedService` that queries the database and a `redis.provider`
that configures a Redis client. Example tests are provided to measure performance and validate
caching logic.

## Project setup

```bash
# Install dependencies
$ yarn install
```

## Running the application

1. **Start Redis**
   ```bash
   # example using docker
   docker run --name redis -p 6379:6379 -d redis
   ```
2. **Configure database connection** in `src/db/db.provider.ts` or via environment variables
   (e.g. connection string for PostgreSQL).
3. **Launch the NestJS service**
   ```bash
   # development
   yarn start:dev
   ```

The server will listen on `http://localhost:3000` by default. Use the `/feed` endpoint to fetch
feed data; caching logic will automatically store results in Redis.

## Testing

Unit and integration tests are included to validate service behavior and measure the
performance improvement provided by Redis.

```bash
# run unit tests
$ yarn test

# end-to-end tests
$ yarn test:e2e

# generate coverage reports
$ yarn test:cov
```

## Deployment

This service can be containerized with Docker or deployed to any environment that supports
Node.js. Ensure Redis is accessible from the deployment target and that environment variables
for the database connection are set.

A simple `Dockerfile` could look like:

```Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production
COPY dist ./dist
CMD ["node", "dist/main.js"]
``` 

Build and run the container alongside a Redis instance.

## Resources

- [NestJS Documentation](https://docs.nestjs.com) – framework reference.
- [Redis Documentation](https://redis.io/docs/) – caching concepts and commands.

## License

This project is licensed under the MIT License.
