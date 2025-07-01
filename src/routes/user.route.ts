import express from "express";
import { signUp, login, resendVerificationCode } from "../controllers";
import { validate } from "../middlewares/validate.middleware";
import {
  userSignUpSchema,
  userVerificationSchema,
  passwordResetRequestSchema,
  passwordResetVerificationCodeSchema,
  passwordResetSchema,
} from "../validators/user.validator";
import { passwordResetRequest, resetPassword, verifyPasswordResetCode } from "../controllers/passwordReset.controller";

const userRouter = express.Router();

userRouter.post("/signup", validate(userSignUpSchema, "body"), signUp);
userRouter.post(
  "/resend-verify-email",
  validate(userVerificationSchema),
  resendVerificationCode
);
userRouter.post(
  "/reset-password/request",
  validate(passwordResetRequestSchema),
  passwordResetRequest
);
userRouter.post(
  "/reset-password/verify-reset-code",
  validate(passwordResetVerificationCodeSchema), verifyPasswordResetCode
);
userRouter.patch("/change-password", validate(passwordResetSchema), resetPassword);
userRouter.post("/login", login);

export { userRouter };
