
import { userRepository } from '../repositories/user.repository.js';
import bcrypt from 'bcrypt';

export const createUserService = async (name: string, email: string, password: string, role?: string) => {
    const existing = await userRepository.findByEmail(email);
    if (existing)
        throw new Error('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    return await userRepository.create(name, email, hashedPassword, role);
};

export const getUserByEmailService = async (email: string) => {
    const existingEmail = await userRepository.findByEmail(email);
    if (!existingEmail)
        throw new Error('User not found');  
    return await userRepository.findByEmail(email);
};

export const getUserByIdService = async (id: string) => {
    const existingUser = await userRepository.findById(id);
    if (!existingUser)
        throw new Error('User not found');
    return existingUser;
};

export const updateUserService = async (id: string, updates: Partial<{
    name: string; email: string; password: string; role: string
}>) => {
    const existingUser = await userRepository.findById(id);
    if (!existingUser)
        throw new Error('User not found');
    const existingEmail = await userRepository.findByEmail(updates.email as string)
    if (existingEmail && existingEmail._id.toString() !== id)
        throw new Error('Email already exists');
    return await userRepository.update(id, updates);
};

export const deleteUserService = async (id: string) => {
    const existingUser = await userRepository.findById(id);
    if (!existingUser)
        throw new Error('User not found');
    return await userRepository.softDelete(id);
};

export const listUsersService = async () => {
    return await userRepository.findAll();
};
