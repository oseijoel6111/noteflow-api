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

// request password reset code
export const createResetCode = async (
  user: User,
  code: number,
  expiryMinutes: number = 15
): Promise<PasswordResetCode> => {
  // Invalidate previous unused codes
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

  // Set expiry
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + expiryMinutes);

  // Create and save new code
  const resetCode = resetPasswordRepository.create({
    resetCode: code,
    isUsed: false,
    expiresAt,
    user,
  });

  return await resetPasswordRepository.save(resetCode);
};

