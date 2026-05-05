//Rotas para os endpoints da API
import { Router } from 'express';
import { movieController } from '../controllers/movie.controllers.js';

const router = Router();

router.post('/', movieController.createMovieController);
router.get('/', movieController.getAllMoviesController);
router.get('/:id', movieController.getByIdMovieController);
router.put('/:id', movieController.updateMovieController);
router.delete('/:id', movieController.softDeleteMovieController);

export default router;