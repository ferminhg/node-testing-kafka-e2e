import { GenericContainer, StartedTestContainer } from 'testcontainers'
import { createClient, RedisClientType } from 'redis'

describe('Using redis', () => {
  let startedTestContainer: StartedTestContainer
  let redisClient: RedisClientType

  beforeAll(async () => {
    startedTestContainer = await new GenericContainer('redis:latest').withExposedPorts(6379).start()
    const redisUrl = `redis://${startedTestContainer.getHost()}:${startedTestContainer.getMappedPort(6379)}`
    redisClient = createClient({ url: redisUrl })
    await redisClient.connect()
  })

  afterAll(async () => {
    await redisClient.disconnect()
    await startedTestContainer.stop()
  })

  it('should by empty and could insert value', async () => {
    const resultEmpty = await redisClient.get('test')
    expect(resultEmpty).toBeNull()
    await redisClient.set('test', 'value')
    const resultValid = await redisClient.get('test')
    expect(resultValid).toBe('value')
  })
})
