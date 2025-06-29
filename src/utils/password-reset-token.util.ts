import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateResetPasswordToken = (userId: number) => {
  const secret = process.env.PASSWORD_RESET_SECRET;
  if (!secret) {
    throw new Error(
      "PASSWORD_RESET_SECRET is not defined in environment variables."
    );
  }
  const expiresIn = "15m";
  const token = jwt.sign({ userId, purpose: "password-reset" }, secret, {
    expiresIn,
  });
  return token;
};
