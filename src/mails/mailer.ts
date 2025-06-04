import { createTransport } from 'nodemailer'
import { ENV } from '../config'
import { logger } from '../utils';

export const mailer = createTransport({
    host: ENV.MAIL_HOST,
    port: ENV.MAIL_PORT,
    secure: true,
    auth: {
        user: ENV.MAIL_USER,
        pass: ENV.MAIL_PASSWORD,
    },
})