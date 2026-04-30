//Rotas para os endpoints da API
import { Router } from 'express';
import { movieCreate, movieList, movieGetById, movieUpdate, movieDelete } from '../controllers/movie.Controllers.js';

const router = Router();

router.post('/', movieCreate);
router.get('/', movieList);
router.get('/:id', movieGetById);
router.put('/:id', movieUpdate);
router.delete('/:id', movieDelete);

export default router;