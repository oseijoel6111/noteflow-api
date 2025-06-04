import { mailer } from './mailer'
import { ENV } from '../config'
import { renderTemplate } from '../utils'

export const sendVerificationEmail = async (email: string, verificationCode: string): Promise<any> => {
    try {
        // Render the email template with the verification code
        const emailContent = await renderTemplate('verification.template', { verificationCode });

        const mailResponse = await mailer.sendMail({
            from: `'"${ENV.APP_NAME}" <${ENV.APP_MAIL}>'`,
            to: email,
            subject: `Verify your email on ${ENV.APP_NAME}`,
            text: `Your verification code is: ${verificationCode}`,
            html: emailContent,
        })
        return mailResponse;
    } catch (error) {
        console.error('Error sending verification email:', error);
        throw new Error('Failed to send verification email');
    }

}