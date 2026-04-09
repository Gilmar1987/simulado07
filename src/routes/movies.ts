//Rotas para os endpoints da API
import { Router } from 'express';
import { movieCreate, movieList, movieGetById, movieUpdate, movieDelete } from '../controllers/Movie.Controllers';

const router = Router();

router.post('/movies', movieCreate);
router.get('/movies', movieList);
router.get('/movies/:id', movieGetById);
router.put('/movies/:id', movieUpdate);
router.delete('/movies/:id', movieDelete);

export default router;