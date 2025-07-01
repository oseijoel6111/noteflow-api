import { emailQueue, passwordResetQueue } from "../config";

export const sendVerificationEmailJob = async (
  email: string,
  verificationCode: string
): Promise<void> => {
  try {
    await emailQueue.add("sendEmail", {
      email,
      verificationCode,
    });
  } catch (error) {
    console.error("Error adding email to queue:", error);
    throw new Error("Failed to add email to queue");
  }
};

// reset password email job
export const sendPasswordResetEmailJob = async (
  email: string,
  resetCode: string
): Promise<void> => {
  try {
    await passwordResetQueue.add("sendPasswordResetEmail", {
      email,
      resetCode,
    });
  } catch (error) {
    console.error("Error adding email to queue:", error);
    throw new Error("Failed to add email to queue");
  }
};
