import { Request, Response, NextFunction } from "express";
import { createResetCode, findUserByEmail } from "../services";
import { logger, errorResponse, successResponse, generateCode } from "../utils";
import { StatusCodes } from "http-status-codes";
import { sendPasswordResetEmailJob } from "../jobs";

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
  // ?check if user is verified
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
    await createResetCode(existingUser, Number(resetCode))

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



