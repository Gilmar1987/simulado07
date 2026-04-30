import { Request, Response } from 'express';
import Movie from '../model/movie.Model.js';
import { movieSchema } from '../schemas/movieSchema.js';

const normalize = (str: string) => str.toUpperCase().replace(/\s+/g, '');

// Criar um novo filme
export const movieCreate = async (req: Request, res: Response) => {
    const validatedData = movieSchema.parse(req.body);
    const { title, description, year, genres, image, video } = validatedData;
    const titleNormalized = normalize(title);
    const existing = await Movie.findOne({ titleNormalized });
    if (existing)
        return res.status(409).json({ message: 'Movie already exists' });
    try {
        const newMovie = await Movie.create({ title, titleNormalized, description, year, genres, image, video });
        res.status(201).json(newMovie);
    } catch (error: any) {
        if (error.name === 'CastError')
            return res.status(400).json({ message: 'Invalid data format' });
        res.status(500).json({ message: 'Internal server error', error });
    }
};

// Listar todos os filmes
export const movieList = async (req: Request, res: Response) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

// Obter um filme por ID
export const movieGetById = async (req: Request, res: Response) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie)
            return res.status(404).json({ message: 'Movie not found' });
        res.status(200).json(movie);
    } catch (error: any) {
        if (error.name === 'CastError')
            return res.status(400).json({ message: 'Invalid ID format' });
        res.status(500).json({ message: 'Internal server error', error });
    }
};

// Atualizar um filme por ID
export const movieUpdate = async (req: Request, res: Response) => {
    const validatedData = movieSchema.partial().parse(req.body);
    const { title, description, year, genres, image, video } = validatedData;

    const updates = Object.fromEntries(
        Object.entries({ title, description, year, genres, image, video })
            .filter(([_, value]) => value !== undefined && value !== null && value !== 'any')
    );

    if (updates.title) {
        const existing = await Movie.findOne({
            _id: { $ne: req.params.id },
            titleNormalized: normalize(updates.title as string)
        });
        if (existing)
            return res.status(409).json({ message: 'Movie with this title already exists' });
        updates.titleNormalized = normalize(updates.title as string);
    }

    try {
        const updated = await Movie.findByIdAndUpdate(req.params.id, updates, { returnDocument: 'after' });
        if (!updated)
            return res.status(404).json({ message: 'Movie not found' });
        res.status(200).json(updated);
    } catch (error: any) {
        if (error.name === 'CastError')
            return res.status(400).json({ message: 'Invalid ID format' });
        res.status(500).json({ message: 'Internal server error', error });
    }
};

// Soft Delete de um filme por ID
export const movieDelete = async (req: Request, res: Response) => {
    try {
        const deleted = await Movie.findByIdAndUpdate(req.params.id, {
            isDeleted: true,
            deletedAt: new Date()
        }, { returnDocument: 'after' });
        if (!deleted)
            return res.status(404).json({ message: 'Movie not found' });
        res.status(204).send();
    } catch (error: any) {
        if (error.name === 'CastError')
            return res.status(400).json({ message: 'Invalid ID format' });
        res.status(500).json({ message: 'Internal server error', error });
    }
};
