import { Request, Response } from 'express';
import Movie from '../model/modelMovie.js';

const normalize = (str: string) => str.toUpperCase().replace(/\s+/g, '');

// Criar um novo filme
export const movieCreate = async (req: Request, res: Response) => {
    const { title, description, year, genres, image, video } = req.body;
    if (!title || !description || !year || !genres || !image || !video)
        return res.status(400).json({ message: 'All fields are required' });

    const titleNormalized = normalize(title);
    const existing = await Movie.findOne({ titleNormalized });
    if (existing)
        return res.status(409).json({ message: 'Movie already exists' });

    const newMovie = await Movie.create({ title, titleNormalized, description, year, genres, image, video });
    res.status(201).json(newMovie);
};

// Listar todos os filmes
export const movieList = async (req: Request, res: Response) => {
    const movies = await Movie.find();
    res.status(200).json(movies);
};

// Obter um filme por ID
export const movieGetById = async (req: Request, res: Response) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie)
        return res.status(404).json({ message: 'Movie not found' });
    res.status(200).json(movie);
};

// Atualizar um filme por ID
export const movieUpdate = async (req: Request, res: Response) => {
    const { title, description, year, genres, image, video } = req.body;

    const updates = Object.fromEntries(
        Object.entries({ title, description, year, genres, image, video })
            .filter(([_, value]) => value !== undefined && value !== null && value !== 'any')
    );


    if (updates.title) {
        const existing = await Movie.findOne({
            _id: { $ne: req.params.id },
            titleNormalized: normalize(updates.title)
        });
        if (existing)
            return res.status(409).json({ message: 'Movie with this title already exists' });
        updates.titleNormalized = normalize(updates.title);
    }


    const updated = await Movie.findByIdAndUpdate(req.params.id, updates, { returnDocument: 'after' });
    if (!updated)
        return res.status(404).json({ message: 'Movie not found' });
    res.status(200).json(updated);
};

// Deletar um filme por ID
export const movieDelete = async (req: Request, res: Response) => {
    const deleted = await Movie.findByIdAndUpdate(req.params.id, {
        isDeleted: true,
        deletedAt: new Date()
    },
        {
            returnDocument: 'after'
        });
    if (!deleted)
        return res.status(404).json({ message: 'Movie not found' });
    res.status(204).send();
};
