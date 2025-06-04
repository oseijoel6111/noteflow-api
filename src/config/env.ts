import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS || '10', 10),
    GENERATE_CODE_LENGTH: parseInt(process.env.GENERATE_CODE_LENGTH || '3', 10),
    MAIL_HOST: process.env.MAIL_HOST || 'smtp.example.com',
    MAIL_PORT: parseInt(process.env.MAIL_PORT || '587', 10),
    MAIL_USERNAME: process.env.MAIL_USERNAME || 'user',
    MAIL_PASSWORD: process.env.MAIL_PASSWORD || 'password',
    APP_NAME: process.env.APP_NAME || 'MyApp',
    APP_MAIL: process.env.APP_MAIL || ''
}