import {Router } from 'express';
import { userController } from '../controllers/user.controllers.js';

const router = Router();

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/email/:email', userController.getByEmailUser);
router.get('/:id', userController.getByIdUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;