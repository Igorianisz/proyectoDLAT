import { Router } from 'express';
import { jwtMiddleware } from '../middlewares/jwt.middleware';
import { projectController } from '../controllers/project.controller';

const router = Router();

// Ruta para obtener información de todos los proyectos
router.get('/', jwtMiddleware.verifyToken, projectController.getAllProject);

// Ruta para obtener info de un proyecto por su ID uuid
router.get('/:id', jwtMiddleware.verifyToken, projectController.getProjectById);

// Ruta para creación de proyectos
router.post('/', jwtMiddleware.verifyToken, projectController.createProject);

router.delete(
    '/:id',
    jwtMiddleware.verifyToken,
    projectController.deleteProject,
);

router.post(
    '/update/:projectId',
    jwtMiddleware.verifyToken,
    projectController.updateProject,
);

// TODO, UPDATE Y DELETE DE PROYECTOS

export default router;
