import { Worker } from 'bullmq'
import { sendVerificationEmail, sendPasswordResetEmail } from '../mails/mailer.service'
import { logger } from '../utils'
import { redisConnection } from '../config'

export const sendVerificationEmailWorker = new Worker('email', async job => {
    const { email, verificationCode } = job.data
    await sendVerificationEmail(email, verificationCode)
},
    { connection: redisConnection }
)

sendVerificationEmailWorker.on('completed', job => {
    logger.info(`Email job completed successfully: ${job.id}`)
})

sendVerificationEmailWorker.on('failed', (job, err) => {
    logger.error(`Email job failed: ${job?.id}, Error: ${err.message}`)
})

sendVerificationEmailWorker.on('progress', (job, progress) => {
    logger.info(`Email job progress: ${job.id}, Progress: ${progress}%`)
})

// send reset password email worker
export const sendResetPasswordEmailWorker = new Worker('passwordReset', async job =>{
    const {email, resetCode} = job.data;
    await sendPasswordResetEmail(email, resetCode);
},
    {connection: redisConnection}
)

sendResetPasswordEmailWorker.on('completed', job => {
    logger.info(`Email job completed successfully: ${job.id}`)
})

sendResetPasswordEmailWorker.on('failed', (job, err) => {
    logger.error(`Email job failed: ${job?.id}, Error: ${err.message}`)
})

sendResetPasswordEmailWorker.on('progress', (job, progress) => {
    logger.info(`Email job progress: ${job.id}, Progress: ${progress}%`)
})
