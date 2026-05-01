import {z} from 'zod';

export const userSchema = z.object({
    name: z.string().min(2).max(100),
    email: z.string().check(z.email({ message: "Endereço de e-mail inválido" })), 
    password: z.string().min(6).max(100),
    role: z.enum(['user', 'admin']).default('user')
});

