import { z } from 'zod'

export const userSignUpSchema = z.object({
    body: z.object({
        username: z.string().min(3, 'Username must be at least 3 characters long'),
        email: z.string().email('Invalid email address'),
        password: z.string().min(6, 'Password must be at least 6 characters long')
            .max(15, 'Password must be at most 15 characters long')
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,15}$/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
    })
})

export type CreateUserInput = z.infer<typeof userSignUpSchema>

export const userLoginSchema = z.object({
    username: z.string().min(3, 'Invalid username'),
    password: z.string().min(6, 'Password must be at least 8 characters long'),
})