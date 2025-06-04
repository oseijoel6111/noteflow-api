import { Worker } from 'bullmq'
import { sendVerificationEmail } from '../../mails/mailer.service'
import { logger } from '../../utils'

export const sendVerificationEmailWorker = new Worker('email', async job => {
    const { email, verificationCode } = job.data
    await sendVerificationEmail(email, verificationCode)
})

sendVerificationEmailWorker.on('completed', job => {
    logger.info(`Email job completed successfully: ${job.id}`)
})

sendVerificationEmailWorker.on('failed', (job, err) => {
    logger.error(`Email job failed: ${job?.id}, Error: ${err.message}`)
})