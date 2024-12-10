import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { jwtMiddleware } from '../middlewares/jwt.middleware';

const router = Router();

// Ruta para obtener información de todos los usuarios
router.get('/', jwtMiddleware.verifyToken, userController.getAllUsers);

// Ruta para obtener info de un usuario por su ID uuid
router.get('/:id', jwtMiddleware.verifyToken, userController.getUserById);

// Ruta para creación de usuarios
router.post('/', jwtMiddleware.verifyToken, userController.createUser);

// Ruta para actualización de información de usuario
router.patch('/:id', jwtMiddleware.verifyToken, userController.updateUser);

router.delete('/:id', jwtMiddleware.verifyToken, userController.deleteUser);

export default router;
