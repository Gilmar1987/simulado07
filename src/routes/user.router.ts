import {Router } from 'express';
import { userController } from '../controllers/user.controllers.js';

const router = Router();

router.post('/', userController.create);
router.get('/', userController.list);
router.get('/email/:email', userController.getByEmail);
router.get('/:id', userController.getById);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

export default router;