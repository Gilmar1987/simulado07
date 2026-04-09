// Controllers com DB in memory
import { Request, Response } from 'express';


/*
Entidade: Movie
Atributos:
● id
● title

● description
● year
● genres
● image
● video
*/

// Simulando um banco de dados em memória
let movies: {
    id: number;
    title: string;
    description: string;
    year: number;
    genres: string;
    image: string;
    video: string
}[] = [];

let currentId: number = 1; // Variável para controlar o ID atual

// Criar um novo usuário
export const movieCreate = (req: Request, res: Response) => {
    const { title, description, year, genres, image, video } = req.body;
    const ExistingMovie = movies.some(m => m.title.toLocaleUpperCase().replace(/\s/g, '') === title.toLocaleUpperCase().replace(/\s/g, ''));
    if (ExistingMovie) 
        return res.status(400).json({ message: 'Movie already exists' });
    const newMovie = {
        id: currentId ++, // Incrementa o ID para o próximo filme
        title,
        description,
        year,
        genres,
        image,
        video
    };
    movies.push(newMovie);
    res.status(201).json(newMovie);
};

// Listar todos os usuários
export const movieList = (req: Request, res: Response) => {
    if (movies.length === 0) {
        return res.status(200).json({ message: 'No movies found' });
    }
    res.status(200).json(movies);
};

// Obter um usuário por ID
export const movieGetById = (req: Request, res: Response) => {
   
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

    const movie = movies.find(u => u.id === id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({ message: 'Movie not found' });
    }
};

// Atualizar um usuário por ID
export const movieUpdate = (req: Request, res: Response) => {
    
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

    const { title, description, year, genres, image, video } = req.body;
    const movieIndex = movies.findIndex(u => u.id === id);
    if (movieIndex !== -1) {
        
        movies[movieIndex] = { ...movies[movieIndex], ...req.body, id }; // o id no fim garante que não mudem o ID

        res.status(200).json(movies[movieIndex]);
    } else {
        res.status(404).json({ message: 'Movie not found' });
    }
};

// Deletar um usuário por ID
export const movieDelete = (req: Request, res: Response) => {
    
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

    const movieIndex = movies.findIndex(u => u.id === id);
    if (movieIndex !== -1) {
        movies.splice(movieIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Movie not found' });
    }
};