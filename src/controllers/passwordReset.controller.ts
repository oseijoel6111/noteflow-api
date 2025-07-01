import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import {
  createResetCode,
  findUserByEmail,
  findUserById,
  saveNewUserPassword,
  verifyResetPasswordCode,
} from "../services";
import {
  logger,
  errorResponse,
  successResponse,
  generateCode,
  generateResetPasswordToken,
  generateHash,
} from "../utils";
import { StatusCodes } from "http-status-codes";
import { sendPasswordResetEmailJob } from "../jobs";
import { error } from "console";

export const passwordResetRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const existingUser = await findUserByEmail(req.body.email);
    // check if user exists
    if (!existingUser) {
      errorResponse(res, StatusCodes.NOT_FOUND, "User not found", {
        email: "Email does not exists",
      });
      return;
    }
    // check if user is verified
    if (!existingUser.isVerified) {
      errorResponse(res, StatusCodes.BAD_REQUEST, "Email not verified", {
        email: "Kindly verifiy your email before resetting your password",
      });
      return;
    }
    // generate reset code
    const resetCode = generateCode();
    // remove sensitive data from response
    const {
      password,
      isVerified,
      verificationCode: _,
      createdAt,
      updatedAt,
      ...userResponse
    } = existingUser;
    logger.info({
      message: "Generated reset code",
      email: req.body.email,
      code: resetCode,
    });

    // save reset code
    await createResetCode(existingUser, Number(resetCode));

    // send email
    await sendPasswordResetEmailJob(existingUser.email, resetCode);
    logger.info({
      message: "Password reset code sent",
    });

    successResponse(
      res,
      StatusCodes.OK,
      "Password reset code sent to your email",
      { user: userResponse }
    );
  } catch (error) {
    errorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      "An error occured while requesting reset code",
      { error }
    );
  }
};

// verify password reset code
export const verifyPasswordResetCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { resetCode } = req.body;

    const user = await verifyResetPasswordCode(resetCode);

    if (!user) {
      errorResponse(res, StatusCodes.BAD_REQUEST, "Invalid or expired code", {
        resetCode: "Code is invalid or expired",
      });
      return;
    }
    const token = generateResetPasswordToken(user!.id);
    successResponse(res, StatusCodes.OK, "Reset code verified", {
      resetToken: token,
    });
  } catch (error) {
    errorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      "An error occurred during code verification",
      { error }
    );
  }
};

// reset password
export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {token, newPassword} = req.body;
    const secret = process.env.PASSWORD_RESET_SECRET;
    if (!secret) {
      errorResponse(
        res,
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Password reset secret is not configured",
        {}
      );
      return;
    }
    const payload = jwt.verify(token, secret) as unknown as { userid: number; purpose: string };
    if (payload.purpose !== 'password-reset'){
      errorResponse(res, StatusCodes.UNAUTHORIZED, "Invalid reset token", {error})
      return;
    }
    const user = await findUserById(payload.userid);
    if (!user){
      errorResponse(res, StatusCodes.NOT_FOUND, "User not found", {error})
      return;
    }
    
    await saveNewUserPassword(user.id, newPassword);

    successResponse(res, StatusCodes.ACCEPTED, "Password reset successful");
  } catch (error) {
    errorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      "An error occured while resetting password",
      { error }
    );
  }
}
