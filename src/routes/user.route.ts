import express from "express";
import { signUp, login, resendVerificationCode } from "../controllers";
import { validate } from "../middlewares/validate.middleware";
import {
  passwordResetRequestSchema,
  userSignUpSchema,
  userVerificationSchema,
} from "../validators/user.validator";
import { passwordResetRequest } from "../controllers/passwordReset.controller";

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
userRouter.post("/login", login);

export { userRouter };
