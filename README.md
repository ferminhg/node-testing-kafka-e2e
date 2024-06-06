# node-testing-kafka-e2e

Service using node to test kafka producer and consumer using different approaches: 

- Using jest.
- Using testcontainers.
  - ✅ Test redis. Create a container with redis and test the connection. `src/test-e2e/redis.test.ts` 
- Using docker services.

## Running the project

Use docker-compose to run the project.

```bash
docker compose up -d
```

## Running the tests

To run the tests, use the following command using docker compose:

```bash
docker compose up
docker compose exec testing-service yarn test
docker compose exec testing-service yarn test-e2e
```
