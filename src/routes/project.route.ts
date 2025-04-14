import { Router } from 'express';
import { jwtMiddleware } from '../middlewares/jwt.middleware';
import { projectController } from '../controllers/project.controller';
import { validateBody } from '../middlewares/validateBody.middleware';
import {
    deleteProjectSchema,
    createProjectSchema,
    getProjectByIdSchema,
    updateProjectSchema,
    assingUserToProjectSchema,
    removeUserToProjectSchema,
} from '../config/joi/projectSchema';

const router = Router();

// Ruta para obtener información de todos los proyectos
router.get('/', jwtMiddleware.verifyToken, projectController.getAllProject);

// Ruta para obtener info de un proyecto por su ID uuid
router.get(
    '/:projectId',
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

// Ruta para eliminacion de proyectos
router.delete(
    '/:projectId',
    jwtMiddleware.verifyToken,
    validateBody.validateReqBody(deleteProjectSchema),
    projectController.deleteProject,
);

// Ruta para actualizacion de proyectos
router.post(
    '/update/:projectId',
    jwtMiddleware.verifyToken,
    validateBody.validateReqBody(updateProjectSchema),
    projectController.updateProject,
);

router.post(
    '/assign/:projectId',
    jwtMiddleware.verifyToken,
    validateBody.validateReqBody(assingUserToProjectSchema),
    projectController.assingUserToProject,
);

router.delete(
    '/remove/:projectId',
    jwtMiddleware.verifyToken,
    validateBody.validateReqBody(removeUserToProjectSchema),
    projectController.removeUserFromProject,
);

export default router;
