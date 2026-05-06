import Movie from '../model/movieModel.js';
/*
{
    "title": "Batman: Batmam Liga da Justiça 07 ",
    "description": "Quando a ameaça conhecida como o Coringa surge de seu passado, ele causa estragos e caos no povo de Gotham.",
    "year": 2015,
    "genres": "Action, Crime, Drama",
    "image": "https://tmdb.org",
    "video": "https://youtube.com"
}
    */

export const movieRepository = {
    
   
    create: async (title: string, description: string, year: number, genres: string, image: string, video: string) => {
        const titleNormalized = title.toUpperCase().replace(/\s+/g, '');
        const newMovie = new Movie({ title, titleNormalized, description, year, genres, image, video });
        return await newMovie.save();
    },

    findByTitleNormalized:  async (titleNormalized: string) =>{
        return await Movie.findOne({ titleNormalized });
    },

    findAll: async (skip:number , limit:number) => {
        return await Movie.find().skip(skip).limit(limit);
       
    },
    findById: async (id: string) => {
        return await Movie.findById(id);
    },

    update: async (id: string, updates: Partial<{ title: string; description: string; year: number; genres: string; image: string; video: string }>) => {
        return await Movie.findByIdAndUpdate(id, updates, { returnDocument: 'after' });
    },

    softDelete: async (id: string) => {
        return await Movie.findByIdAndUpdate(id, { isDeleted: true, deletedAt: new Date() }, { returnDocument: 'after' });
    },
}