import { movieRepository } from '../repositories/movie.repository.js';


export const movieService = {

    createMovieService: async (title: string, description: string, year: number,
        genres: string, image: string, video: string) => {
            const titleNormalized = title.toUpperCase().replace(/\s+/g, '');
            const existingMovie = await movieRepository.findByTitleNormalized(titleNormalized);
            if (existingMovie)
                throw new Error('Movie already exists');
        return await movieRepository.create(title, description, year, genres, image, video);
    },

    getAllMoviesService: async (page: number = 1, limit: number = 12) => {
        const skip = (page - 1) * limit;
        const { movies, total } = await movieRepository.findAll(skip, limit);
        return {
            movies,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        };
    },

    getMovieByIdService: async (id: string) => {
        const movie = await movieRepository.findById(id);
        if (!movie)
            throw new Error('Movie not found');
        return movie;
    },

    updateMovieService: async (id: string, updates: Partial<{
        title: string; description: string;
        year: number; genres: string; image: string; video: string
    }>) => {
        const existingMovie = await movieRepository.findById(id);
        if (!existingMovie)
            throw new Error('Movie not found');
        return await movieRepository.update(id, updates);
    },

    softDeleteMovieService: async (id: string) => {
        const existingMovie = await movieRepository.findById(id);
        if (!existingMovie)
            throw new Error('Movie not found');
        return await movieRepository.softDelete(id);
    },

   
};