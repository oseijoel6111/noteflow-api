import { mailer } from "./mailer";
import { ENV } from "../config";
import { renderTemplate } from "../utils";

export const sendVerificationEmail = async (
  email: string,
  verificationCode: string
): Promise<any> => {
  try {
    // Render the email template with the verification code
    const emailContent = await renderTemplate("verification.template", {
      verificationCode,
    });

    const mailResponse = await mailer.sendMail({
      from: `'"${ENV.APP_NAME}" <${ENV.APP_MAIL}>'`,
      to: email,
      subject: `Verify your email on ${ENV.APP_NAME}`,
      text: `Your verification code is: ${verificationCode}`,
      html: emailContent,
    });
    return mailResponse;
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Failed to send verification email");
  }
};

export const sendPasswordResetEmail = async (
  email: string,
  resetCode: string
): Promise<any> => {
  try {
    // Render the email template with the reset code
    const emailContent = await renderTemplate("passwordResetCode.template", {
      resetCode,
    });
    const mailResponse = await mailer.sendMail({
        from: `'"${ENV.APP_NAME}" <${ENV.APP_MAIL}>'`,
      to: email,
      subject: `Reset your password on ${ENV.APP_NAME}`,
      text: `Your password reset code is: ${resetCode}\n
      The code will expire in 15 minutes`,
      html: emailContent,
    });
    return mailResponse;
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error("Failed to send password reset email");
  }
};
