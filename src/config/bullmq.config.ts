import { Queue } from 'bullmq'
import { ENV } from './env.config'
import IORedis from 'ioredis'

// Create a Redis connection instance
export const redisConnection = new IORedis({
    host: ENV.REDIS_HOST,
    port: ENV.REDIS_PORT,
    maxRetriesPerRequest: null, // Disable automatic retries
    enableReadyCheck: true, // Enable ready check to ensure Redis is ready before using it
})

// Create a BullMQ queue for email processing
export const emailQueue = new Queue('email', { connection: redisConnection })