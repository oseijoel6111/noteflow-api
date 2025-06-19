import { AppDataSource } from "../config";
import { PasswordResetCode, User } from "../models";
import { CreateUserInput } from '../validators'

const userRepository = AppDataSource.getRepository(User);
const resetPasswordRepository = AppDataSource.getRepository(PasswordResetCode);


export const createUser = async (userData: CreateUserInput) => {
    const user = userRepository.create(userData)
    return await userRepository.save(user)
}


export const findUserByEmail = async (email: string) => {
    return await userRepository.findOneBy({ email })
}

export const createResetCode = async (code: number, expiryMinutes: number = 10): Promise<PasswordResetCode | null> => {
    const expiresAt = new Date()
    expiresAt.setMinutes(expiresAt.getMinutes() + expiryMinutes);

    const resetCode = resetPasswordRepository.create({
        resetCode: code,
        isUsed: false,
    });
    return await resetPasswordRepository.save(resetCode)

}