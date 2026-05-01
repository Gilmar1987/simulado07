import { movieService } from "../services/movie.service.js";
import { Request, Response } from 'express';
import { movieSchema } from "../schemas/movieSchema.js";
import { isValidObjectId } from 'mongoose';


export const movieController = {
    createMovie: async (req: Request, res: Response) => {
        // #swagger.parameters['body'] = { schema: { $ref: '#/definitions/Movie' } }
        try {
            const validatedData = movieSchema.parse(req.body);
            const { title, description, year, genres, image, video } = validatedData;
            const movie = await movieService.create(title, description, year, genres, image, video);
            res.status(201).json(movie);
        } catch (error) {
            if (error instanceof Error)
                return res.status(400).json({ error: 'Invalid data format' });
            res.status(500).json({ error: (error as Error).message });
        }
    },

    getAllMovies: async (req: Request, res: Response) => {
        try {
            const movies = await movieService.getAll();
            res.status(200).json(movies);
        } catch (error) {
            return res.status(500).json({ error: (error as Error).message });
        }
    },

    getByIdMovie: async (req: Request, res: Response) => {
        try {
            const id = req.params.id as string;
            if (!isValidObjectId(id))
                return res.status(400).json({ message: 'Invalid movie ID format' });
            const movie = await movieService.getById(id);
            res.status(200).json(movie);
        } catch (error) {
            if (error instanceof Error)
                return res.status(404).json({ error: (error as Error).message });
            res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
        }
    },

    updateMovie: async (req: Request, res: Response) => {
        // #swagger.parameters['body'] = { schema: { $ref: '#/definitions/Movie' } }
        try {
            const id = req.params.id as string;
            if (!isValidObjectId(id))
                return res.status(400).json({ message: 'Invalid movie ID format' });
            const validatedData = movieSchema.partial().parse(req.body);
            const { title, description, year, genres, image, video } = validatedData;
            const updates = { title, description, year, genres, image, video };
            const movie = await movieService.update(id, updates);
            res.status(200).json(movie);
        } catch (error) {
            if (error instanceof Error)
                return res.status(400).json({ error: (error as Error).message });
            res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
        }

    },

    softDeleteMovie: async (req: Request, res: Response) => {
        try {
            const id = req.params.id as string;
            if (!isValidObjectId(id))
                return res.status(400).json({ message: 'Invalid movie ID format' });
            await movieService.softDelete(id);
            res.status(204).send();
        } catch (error) {
            if (error instanceof Error)
                return res.status(404).json({ error: (error as Error).message });
            res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
        }
    }
};