import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { loginSchema, registerSchema } from '../config/joi/authSchema';
import { validateBody } from '../middlewares/validateBody.middleware';

const router = Router();

// Ruta de login de usuario
router.post(
    '/login',
    validateBody.validateReqBody(loginSchema),
    authController.loginByPassword,
);

// Ruta para registrarse como usuario
router.post(
    '/register',
    validateBody.validateReqBody(registerSchema),
    authController.registerByPassword,
);

export default router;
