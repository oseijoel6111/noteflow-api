import { AppDataSource } from "../config";
import { User } from "../models";
import { CreateUserInput } from '../validators'

const userRepository = AppDataSource.getRepository(User);


export const createUser = async (userData: CreateUserInput) => {
    const user = userRepository.create(userData)
    return await userRepository.save(user)
}


export const findUserByEmail = async (email: string) => {
    return await userRepository.findOneBy({ email })
}