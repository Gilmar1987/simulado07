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

        const { name, email, password, role } = userSchema.parse(req.body);
        const user = await createUserService(name, email, password, role);
        res.status(201).json(user);

    },

    getAllUsers: async (req: Request, res: Response) => {

        const users = await listUsersService();
        res.status(200).json(users);

    },

    getByEmailUser: async (req: Request, res: Response) => {


        const email = userSchema.shape.email.parse(req.params.email);
        const user = await getUserByEmailService(email);

        res.status(200).json(user);

    },

    getByIdUser: async (req: Request, res: Response) => {

        const id = req.params.id as string;
        if (!isValidObjectId(id))
            return res.status(400).json({ message: 'Invalid user ID format' });
        const user = await getUserByIdService(id);

        res.status(200).json(user);


    },

    updateUser: async (req: Request, res: Response) => {
        // #swagger.parameters['body'] = { schema: { $ref: '#/definitions/User' } }

        const id = req.params.id as string;
        if (!isValidObjectId(id))
            return res.status(400).json({ message: 'Invalid user ID format' });
        const updates = userSchema.partial().parse(req.body);
        const user = await updateUserService(id, updates);

        res.status(200).json(user);

    },

    deleteUser: async (req: Request, res: Response) => {

        const id = req.params.id as string;
        if (!isValidObjectId(id))
            return res.status(400).json({ message: 'Invalid user ID format' });
        const user = await deleteUserService(id);

        res.status(204).send();

    },
};
