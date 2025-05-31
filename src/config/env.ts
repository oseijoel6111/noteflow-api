import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS || '10', 10),
    GENERATE_CODE_LENGTH: parseInt(process.env.GENERATE_CODE_LENGTH || '3', 10),
}