//Rotas para os endpoints da API
import { Router } from 'express';
import { movieController } from '../controllers/Movie.Controllers.js';

const router = Router();

router.post('/', movieController.createMovie);
router.get('/', movieController.getAllMovies);
router.get('/:id', movieController.getByIdMovie);
router.put('/:id', movieController.updateMovie);
router.delete('/:id', movieController.softDeleteMovie);

export default router;