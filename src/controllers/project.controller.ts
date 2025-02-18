import { NextFunction, Request, Response } from 'express';
import { EnumUserRole } from '../interfaces/role.interface';
import { projectService } from '../services/project.service';
import { getTokenPayload } from '../utils/auth/token.util';
import { userService } from '../services/user.service';

const getAllProject = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const projectList = await projectService.getAllProjects();
        res.status(200).json(projectList);
    } catch (error) {
        next(error);
    }
};

const getProjectById = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { projectId } = req.params;
        const project = await projectService.getProjectById(projectId);
        res.status(200).json(project);
    } catch (error) {
        next(error);
    }
};

const createProject = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { name, description } = req.body;
        const { id } = req;

        const newProject = await projectService.createProject(
            id,
            name,
            description,
        );
        res.status(201).json({ newProject });
    } catch (error) {
        next(error);
    }
};

const deleteProject = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { projectId } = req.params;
        const { id } = req;

        const projectById = await projectService.getProjectById(projectId);

        if (!projectById) {
            res.status(404).json({
                error: `No project found by id ${projectById}`,
            });
            return;
        }
        if (id !== projectById.created_by && req.role !== EnumUserRole.Admin) {
            res.status(403).json({
                error: `Need to be owner or admin to delete the project`,
            });
            return;
        }

        const deletedProject = await projectService.deleteProject(id);
        res.status(200).json(deletedProject);
    } catch (error) {
        next(error);
    }
};

const updateProject = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { name, description, start_date, end_date, status } = req.body;
        const { id } = req;

        const { projectId } = req.params;

        const projectById = await projectService.getProjectById(projectId);

        if (!projectById) {
            res.status(404).json({
                error: `No project found by id ${projectById}`,
            });
            return;
        }

        if (id !== projectById.created_by && req.role !== EnumUserRole.Admin) {
            res.status(403).json({
                error: `Need to be owner or admin to update the project`,
            });
            return;
        }

        const updatedProject = await projectService.updateProject(
            projectId,
            {
                name,
                description,
                start_date,
                end_date,
                status,
            },
            projectById,
        );
        res.status(201).json({ updatedProject });
    } catch (error) {
        next(error);
    }
};

const assingUserToProject = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { userId } = req.body;
        const { id } = req;
        const { projectId } = req.params;

        const projectById = await projectService.getProjectById(projectId);
        const userById = await userService.getUserById(userId);

        if (!projectById) {
            res.status(404).json({
                error: `No project found by id ${projectById}`,
            });
            return;
        }

        if (!userById) {
            res.status(404).json({
                error: `No user found by id ${userById}`,
            });
            return;
        }

        if (id !== projectById.created_by && req.role !== EnumUserRole.Admin) {
            res.status(403).json({
                error: `Need to be owner or admin to update the project`,
            });
            return;
        }
        const newProject = await projectService.assingUserToProject(
            userId,
            projectId,
        );
        res.status(201).json({ newProject });
    } catch (error) {
        next(error);
    }
};

const removeUserFromProject = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { userId } = req.body;
        const { id } = req;
        const { projectId } = req.params;

        const projectById = await projectService.getProjectById(projectId);
        const userById = await userService.getUserById(userId);

        if (!projectById) {
            res.status(404).json({
                error: `No project found by id ${projectById}`,
            });
            return;
        }

        if (!userById) {
            res.status(404).json({
                error: `No user found by id ${userById}`,
            });
            return;
        }
        if (id !== projectById.created_by && req.role !== EnumUserRole.Admin) {
            res.status(403).json({
                error: `Need to be owner or admin to update the project`,
            });
            return;
        }
        const removeFromProject = await projectService.removeUserFromProject(
            userId,
            projectId,
        );
        res.status(201).json({ removeFromProject });
    } catch (error) {
        next(error);
    }
};

export const projectController = {
    getAllProject,
    getProjectById,
    createProject,
    deleteProject,
    updateProject,
    assingUserToProject,
    removeUserFromProject,
};
