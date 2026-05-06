import { movieService } from "../services/movie.service.js";
import { Request, Response } from 'express';
import { movieSchema } from "../schemas/movieSchema.js";
import { isValidObjectId } from 'mongoose';


export const movieController = {
    createMovieController: async (req: Request, res: Response) => {
        /*  #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    title: 'Batman',
                    description: 'Um filme sobre o Batman',
                    year: 2008,
                    genres: 'Action, Crime',
                    image: 'https://tmdb.org/batman.jpg',
                    video: 'https://youtube.com/batman'
                }
            } */
        const validatedData = movieSchema.parse(req.body);
        const { title, description, year, genres, image, video } = validatedData;
        const movie = await movieService.createMovieService(title, description, year, genres, image, video);
        res.status(201).json(movie);
    },

    getAllMoviesController: async (req: Request, res: Response) => {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 9;
        const movies = await movieService.getAllMoviesService(page, limit);
        
       
        res.status(200).json(movies);
    },

    getByIdMovieController: async (req: Request, res: Response) => {
        const id = req.params.id as string;
        if (!isValidObjectId(id))
            return res.status(400).json({ message: 'Invalid movie ID format' });
        const movie = await movieService.getMovieByIdService(id);
        res.status(200).json(movie);
    },

    updateMovieController: async (req: Request, res: Response) => {
        /*  #swagger.parameters['body'] = {
                in: 'body',
                required: false,
                schema: {
                    title: 'Batman Atualizado',
                    description: 'Descrição atualizada',
                    year: 2009,
                    genres: 'Action',
                    image: 'https://tmdb.org/batman2.jpg',
                    video: 'https://youtube.com/batman2'
                }
            } */
        const id = req.params.id as string;
        if (!isValidObjectId(id))
            return res.status(400).json({ message: 'Invalid movie ID format' });
        const validatedData = movieSchema.partial().parse(req.body);
        const { title, description, year, genres, image, video } = validatedData;
        const movie = await movieService.updateMovieService(id, { title, description, year, genres, image, video });
        res.status(200).json(movie);
    },

    softDeleteMovieController: async (req: Request, res: Response) => {
        const id = req.params.id as string;
        if (!isValidObjectId(id))
            return res.status(400).json({ message: 'Invalid movie ID format' });
        await movieService.softDeleteMovieService(id);
        res.status(204).send();
    }
};
