
import { userRepository } from '../repositories/user.repository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

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
    if (updates.email) {
        const existingEmail = await userRepository.findByEmail(updates.email);
        if (existingEmail && existingEmail._id.toString() !== id)
            throw new Error('Email already exists');
    }
    if (updates.password)
        updates.password = await bcrypt.hash(updates.password, 10);
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

export const loginUser = async (email: string, password: string) => {
    const user = await userRepository.findByEmailWithPassword(email);
    if (!user)
        throw new Error('User not found');
    if (user.isDeleted)
        throw new Error('User is deleted');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
        throw new Error('Invalid password');

    // Gerar token

    const payload = {
        
        id: user._id,
        email: user.email,
        role: user.role 
    };

    const secret = process.env.JWT_SECRET as string;
    const token = jwt.sign(payload, secret, { expiresIn: process.env.JWT_EXPIRES_IN });
    
    return {user, token};
}
