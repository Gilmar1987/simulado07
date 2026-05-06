import { Router } from 'express';
import { userController } from '../controllers/user.controllers.js';

const router = Router();

router.post('/login', userController.loginUserController);
router.post('/', userController.createUserController);
router.get('/', userController.getAllUsersController);
router.get('/email/:email', userController.getByEmailUserController);
router.get('/:id', userController.getByIdUserController);
router.put('/:id', userController.updateUserController);
router.delete('/:id', userController.deleteUserController);

export default router;
