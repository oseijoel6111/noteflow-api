import {genSalt, hash, compare} from 'bcrypt'
import {ENV} from '../config'

export const generateHash = async (password:string): Promise<string> => {
    const salt = await genSalt(ENV.SALT_ROUNDS)
    return await hash(password, salt)
}

export const compareHash = async (password: string, hash: string): Promise<boolean> => {
    return compare(password, hash)
}