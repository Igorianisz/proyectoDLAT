import { NextFunction, Request, Response } from 'express';
import { EnumUserRole } from '../interfaces/role.interface';
import { projectService } from '../services/project.service';
import jwt from 'jsonwebtoken';
import { getTokenPayload } from '../utils/auth/token.util';

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
        const { id } = req.params;
        const project = await projectService.getProjectById(id);
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
        const authHeader = req.headers['authorization'];

        if (!authHeader) {
            res.status(403).json({ error: `Bearer not found` });
            return;
        }

        const token = authHeader?.split(' ')[1];

        const { id } = getTokenPayload(token);
        const { name, description } = req.body;
        console.log(id, name, description, req.body);
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
        const { id } = req.params;
        const deletedProject = await projectService.deleteProject(id);
        res.status(200).json(deletedProject);
    } catch (error) {
        next(error);
    }
};

// TODO, UPDATE Y DELETE DE PROYECTOS

export const projectController = {
    getAllProject,
    getProjectById,
    createProject,
    deleteProject,
};
