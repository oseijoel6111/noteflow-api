import { createTransport } from 'nodemailer'
import { ENV } from '../config'

export const mailer = createTransport({
    host: ENV.MAIL_HOST,
    port: ENV.MAIL_PORT,
    auth: {
        user: ENV.MAIL_USERNAME,
        pass: ENV.MAIL_PASSWORD,
    },
})