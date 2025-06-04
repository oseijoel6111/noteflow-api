import {Queue} from 'bullmq'
import {ENV} from './env.config'
import {Redis} from 'ioredis'

// Create a Redis connection instance
const redisConnection = new Redis({
    host: ENV.REDIS_HOST,
    port: ENV.REDIS_PORT,
    maxRetriesPerRequest:  , // Disable automatic retries
    enableReadyCheck: true, // Enable ready check to ensure Redis is ready before using it
})

export const emailQueue = new Queue('email', {
    connection: {
        host: ENV.REDIS_HOST,
        port: ENV.REDIS_PORT,
    },
    defaultJobOptions: {
        attempts: 3,
        backoff: {
            type: 'exponential',
            delay: 1000,
        },
    }
})