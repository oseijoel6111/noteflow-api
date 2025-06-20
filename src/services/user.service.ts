import { AppDataSource } from "../config";
import { PasswordResetCode, User } from "../models";
import { CreateUserInput } from "../validators";

const userRepository = AppDataSource.getRepository(User);
const resetPasswordRepository = AppDataSource.getRepository(PasswordResetCode);

export const createUser = async (userData: CreateUserInput) => {
  const user = userRepository.create(userData);
  return await userRepository.save(user);
};

export const findUserByEmail = async (email: string) => {
  return await userRepository.findOneBy({ email });
};

// create password reset code
export const createResetCode = async (
  code: number,
  expiryMinutes: number = 10
): Promise<PasswordResetCode | null> => {
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + expiryMinutes);

  const resetCode = resetPasswordRepository.create({
    resetCode: code,
    isUsed: false,
  });
  return await resetPasswordRepository.save(resetCode);
};
export const saveResetPasswordCode = async (
  email: string,
  resetPasswordCode: string
): Promise<void> => {
  const user = await userRepository.findOneBy({ email });

  if (!user) {
    throw new Error("User not found");
  }

  await resetPasswordRepository.update(
    {
      user: { id: user.id },
      isUsed: false,
    },
    {
      isUsed: true,
      updatedAt: new Date(),
    }
  );
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  const resetPasswordCodeEntity = resetPasswordRepository.create({
    resetCode: Number(resetPasswordCode),
    expiresAt,
    isUsed: false,
    user,
  });

  // Save new code
  await resetPasswordRepository.save(resetPasswordCodeEntity);
};
