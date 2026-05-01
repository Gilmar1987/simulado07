import { Request, Response } from "express";
import { userSchema } from '../schemas/user.Schema.js';
import { isValidObjectId } from 'mongoose';
import {
    createUserService,
    getUserByEmailService,
    getUserByIdService,
    deleteUserService,
    listUsersService,
    updateUserService
} from '../services/user.service.js';


export const userController = {
    createUser: async (req: Request, res: Response) => {
        // #swagger.parameters['body'] = { schema: { $ref: '#/definitions/User' } }
        try {
            const { name, email, password } = userSchema.parse(req.body);
            const user = await createUserService(name, email, password);
            res.status(201).json(user);
        } catch (error) {
            if ((error as Error).message.includes('already exists'))
                return res.status(409).json({ message: (error as Error).message });
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    getAllUsers: async (req: Request, res: Response) => {
        try {
            const users = await listUsersService();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    },

    getByEmailUser: async (req: Request, res: Response) => {
        try {

            const email = userSchema.shape.email.parse(req.params.email);
            const user = await getUserByEmailService(email);
            if (!user)
                return res.status(404).json({ message: 'User not found' });
            res.status(200).json(user);
        } catch (error) {
            if ((error as Error).message.includes('Invalid email'))
                return res.status(400).json({ message: (error as Error).message });
            res.status(500).json({ message: (error as Error).message });
        }
    },

    getByIdUser: async (req: Request, res: Response) => {
        try {
            const id = req.params.id as string;
            if (!isValidObjectId(id))
                return res.status(400).json({ message: 'Invalid user ID format' });
            const user = await getUserByIdService(id);
            if (!user)
                return res.status(404).json({ message: 'User not found' });
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    },

    updateUser: async (req: Request, res: Response) => {
        // #swagger.parameters['body'] = { schema: { $ref: '#/definitions/User' } }
        try {
            const id = req.params.id as string;
            if (!isValidObjectId(id))
                return res.status(400).json({ message: 'Invalid user ID format' });
            const updates = userSchema.partial().parse(req.body);
            const user = await updateUserService(id, updates);
            if (!user)
                return res.status(404).json({ message: 'User not found' });
            res.status(200).json(user);
        } catch (error) {
            if ((error as Error).message.includes('already exists'))
                return res.status(409).json({ message: (error as Error).message });

            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    deleteUser: async (req: Request, res: Response) => {
        try {
            const id = req.params.id as string;
            if (!isValidObjectId(id))
                return res.status(400).json({ message: 'Invalid user ID format' });
            const user = await deleteUserService(id);
            if (!user)
                return res.status(404).json({ message: 'User not found' });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    },
};
