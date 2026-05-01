import { movieRepository } from '../repositories/movie.repository.js';


export const movieService = {

    create: async (title: string, description: string, year: number,
        genres: string, image: string, video: string) => {
        return await movieRepository.create(title, description, year, genres, image, video);
    },

    getAll: async () => {
        return await movieRepository.findAll();
    },

    getById: async (id: string) => {
        const movie = await movieRepository.findById(id);
        if (!movie)
            throw new Error('Movie not found');
        return movie;
    },

    update: async (id: string, updates: Partial<{
        title: string; description: string;
        year: number; genres: string; image: string; video: string
    }>) => {
        const existingMovie = await movieRepository.findById(id);
        if (!existingMovie)
            throw new Error('Movie not found');
        return await movieRepository.update(id, updates);
    },

    softDelete: async (id: string) => {
        const existingMovie = await movieRepository.findById(id);
        if (!existingMovie)
            throw new Error('Movie not found');
        return await movieRepository.softDelete(id);
    },
};