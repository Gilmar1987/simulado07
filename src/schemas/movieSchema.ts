import {z} from 'zod';

export const movieSchema = z.object({
    title: z.string().min(2, 'Title must be at least 2 characters long'),
    description: z.string().min(10, 'Description must be at least 10 characters long'),
    year: z.number().int().min(1888, 'Year must be 1888 or later'),
    genres: z.string().min(5, 'Genre must be at least 5 characters long'),
    image: z.string().url('Image must be a valid URL'),
    video: z.string().url('Video must be a valid URL'),
});