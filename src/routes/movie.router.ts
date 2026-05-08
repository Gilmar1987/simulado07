//Rotas para os endpoints da API
import { Router } from 'express';
import { movieController } from '../controllers/Movie.Controllers.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { roleMiddleware } from '../middlewares/role.middleware.js';

const router = Router();

router.post('/', authMiddleware, roleMiddleware(['user', 'admin']), movieController.createMovieController);
router.get('/', authMiddleware, roleMiddleware(['user', 'admin']), movieController.getAllMoviesController);
router.get('/:id', authMiddleware, roleMiddleware(['user', 'admin']), movieController.getByIdMovieController);
router.put('/:id', authMiddleware, roleMiddleware(['admin']), movieController.updateMovieController);
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), movieController.softDeleteMovieController);

export default router;