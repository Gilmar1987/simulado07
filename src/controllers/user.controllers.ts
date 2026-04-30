import { Request, Response } from "express";
import { userSchema } from '../schemas/user.Schema.js';
import { isValidObjectId } from 'mongoose'; // Função do Mongoose para validar formato
import {
    createUserService,
    getUserByEmailService,
    getUserByIdService,
    deleteUserService,
    listUsersService,
    updateUserService
} from '../services/user.service.js';


export const userController = {
    create: async (req: Request, res: Response) => {
        try {
            const { name, email, password } = userSchema.parse(req.body);
            const user = await createUserService(name, email, password);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    },
    getByEmail: async (req: Request, res: Response) => {
        try {
            const email = req.params.email as string;
            const user = await getUserByEmailService(email);
            if (!user)
                return res.status(404).json({ message: 'User not found' });
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    },

    getById: async (req: Request, res: Response) => {
        try {
            const id = req.params.id as string;
            if(!isValidObjectId(id))
                return res.status(400).json({ message: 'Invalid user ID format' });
            const user = await getUserByIdService(id);
            if (!user)
                return res.status(404).json({ message: 'User not found' });
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    },

    update: async (req: Request, res: Response) => {
        try {
            const id = req.params.id as string;
            if(!isValidObjectId(id))
                return res.status(400).json({ message: 'Invalid user ID format' });
            const updates = userSchema.partial().parse(req.body);
            const user = await updateUserService(id, updates);
            if (!user)
                return res.status(404).json({ message: 'User not found' });
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    },

    delete: async (req: Request, res: Response) => {
        try {
            const id = req.params.id as string;
            if(!isValidObjectId(id))
                return res.status(400).json({ message: 'Invalid user ID format' });
            const user = await deleteUserService(id);
            if (!user)
                return res.status(404).json({ message: 'User not found' });
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    },

    list: async (req: Request, res: Response) => {
        try {
            const users = await listUsersService();
            res.status(200).json(users);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }
};
