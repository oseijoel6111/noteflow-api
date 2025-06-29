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

// verify reset code
export const verifyResetPasswordCode = async (
  resetCode: string
): Promise<User | null> => {
  const resetCodeEntry = await resetPasswordRepository.findOne({
    where: {
      resetCode: Number(resetCode),
      isUsed: false,
    },
    order: { createdAt: "DESC" },
    relations: ["user"],
  });

  if (!resetCodeEntry) return null;

  const now = new Date();
  if (now > resetCodeEntry.expiresAt) return null;

  // Mark as used
  resetCodeEntry.isUsed = true;
  resetCodeEntry.updatedAt = now;
  await resetPasswordRepository.save(resetCodeEntry);

  return resetCodeEntry.user;
};
