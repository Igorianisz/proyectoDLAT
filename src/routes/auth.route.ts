import { Router } from "express";
import { jwtMiddleware } from "../middlewares/jwt.middleware";
import { authController } from "../controllers/auth.controller";



const router = Router()

// Ruta de login de usuario
router.post("/login", authController.loginByPassword)

// Ruta para registrarse como usuario
router.post("/register", authController.registerByPassword)

export default router

