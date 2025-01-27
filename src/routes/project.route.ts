import { Router } from 'express';
import { jwtMiddleware } from '../middlewares/jwt.middleware';
import { projectController } from '../controllers/project.controller';
import { validateBody } from '../middlewares/validateBody.middleware';
import {
    deleteProjectSchema,
    createProjectSchema,
    getProjectByIdSchema,
    updateProjectSchema,
} from '../config/joi/projectSchema';

const router = Router();

// Ruta para obtener información de todos los proyectos
router.get('/', jwtMiddleware.verifyToken, projectController.getAllProject);

// Ruta para obtener info de un proyecto por su ID uuid
router.get(
    '/:id',
    jwtMiddleware.verifyToken,
    validateBody.validateReqBody(getProjectByIdSchema),
    projectController.getProjectById,
);

// Ruta para creación de proyectos
router.post(
    '/',
    jwtMiddleware.verifyToken,
    validateBody.validateReqBody(createProjectSchema),
    projectController.createProject,
);

router.delete(
    '/:id',
    jwtMiddleware.verifyToken,
    validateBody.validateReqBody(deleteProjectSchema),
    projectController.deleteProject,
);

router.post(
    '/update/:projectId',
    jwtMiddleware.verifyToken,
    validateBody.validateReqBody(updateProjectSchema),
    projectController.updateProject,
);

// TODO, UPDATE Y DELETE DE PROYECTOS

export default router;
