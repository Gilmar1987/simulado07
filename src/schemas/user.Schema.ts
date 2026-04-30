import {z} from 'zod';

export const userSchema = z.object({
    name: z.string().min(2).max(100),
    email: z.string().check(z.email()), 
    password: z.string().min(6).max(100),
    role: z.enum(['user', 'admin']).default('user')
});

