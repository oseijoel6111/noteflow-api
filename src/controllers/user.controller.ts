import { NextFunction, Request, Response } from "express";
import { findUserByEmail, createUser } from "../services";
import {
  generateHash,
  logger,
  errorResponse,
  successResponse,
  generateCode,
} from "../utils";
import { StatusCodes } from "http-status-codes";
import { sendVerificationEmailJob } from "../jobs";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //    determine if user already exist
    const existingUser = await findUserByEmail(req.body.email);
    if (existingUser)
      successResponse(res, StatusCodes.BAD_REQUEST, "User already exists", {
        email: "Email already registered",
      });

    // hash password
    const hashPassword = await generateHash(req.body.password);
    req.body.password = hashPassword;

    // generate verification code
    const verificationCode = generateCode();
    logger.info({
      message: "Generated verification code",
      code: verificationCode,
    });

    req.body.verificationCode = verificationCode;

    // save user to database
    const user = await createUser(req.body);
    if (!user)
      errorResponse(
        res,
        StatusCodes.INTERNAL_SERVER_ERROR,
        "User creation failed",
        {}
      );

    // remove sensitive data from response
    delete req.body.password;
    delete req.body.verificationCode;

    // send verification code to user email
    // Note: In a real application, you would send the verification code via email.
    logger.info({
      message: "Sending verification code to user email",
      email: req.body.email,
      code: verificationCode,
    });

    req.body.verificationCode = verificationCode; // Ensure the code is in the body for the job

    await sendVerificationEmailJob(req.body.email, verificationCode);
    successResponse(
      res,
      StatusCodes.CREATED,
      "User created successfully. A verification code has been sent to your email.",
      { user: req.body }
    );
  } catch (error) {
    errorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      "An error occurred while signing up",
      { error }
    );
  }
};

// resend verification email
export const resendVerificationCode = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const existingUser = await findUserByEmail(req.body.email);
    if (!existingUser) {
      errorResponse(res, StatusCodes.NOT_FOUND, "User not found", {
        email: "Email not registered",
      });
      return;
    }
    // check if user is already verified
    if (existingUser?.isVerified) {
      successResponse(res, StatusCodes.OK, "User is already verified", {
        email: existingUser.email,
      });
      return;
    }
    // generate new verification code
    const verificationCode = generateCode();
    logger.info({
      message: "Generated new verification code",
      code: verificationCode,
    });
    existingUser.verificationCode = verificationCode;
    // remove sensitive data from response
    const { password, isVerified, createdAt, updatedAt, verificationCode: _, ...userResponse } = existingUser;

    // resend verification code to user email
    logger.info({
      message: "Sending new verification code to user email",
      email: existingUser.email,
      code: verificationCode,
    });
    await sendVerificationEmailJob(existingUser.email, verificationCode);
    successResponse(res, StatusCodes.OK, "Verification email resent successfully", {
      user: userResponse,})
  } catch (error) {
    errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, "An error occurred while resending verification email", { error });
    logger.error({
      message: "Error resending verification email",
      error: {},
    });
  }
}

// login user
export const login = (req: Request, res: Response) => {
  const userResponse = {
    status: "success",
    message: "User logged in successfully",
    data: {
      user: req.body,
    },
    token: "1234567890abcdefloging",
  };
  res.json(userResponse);
};
