import { ENV } from '../config'


export const generateCode = (): string => {
    const codeLength = ENV.GENERATE_CODE_LENGTH;
    return Math.floor(Math.random() * Math.pow(10, codeLength)).toString().padStart(codeLength, '0');
}