import { HttpError } from '../utils/error/httpError.utils';
import { projectModel } from '../models/project.model';
import { uuidValidator } from '../utils/error/uuidValidator.utils';

const getAllProjects = async () => {
    const users = await projectModel.getAllProjects();
    return users;
};

const getProjectById = async (id: string) => {
    uuidValidator('project', id);
    const projectById = await projectModel.getProjectById(id);

    if (!projectById) {
        throw new HttpError(`Project not found by id ${id}`, 404);
    }
    return projectById;
};

const createProject = async (id: string, name: string, description: string) => {
    const newProject = await projectModel.createProject(id, name, description);

    return newProject;
};

const deleteProject = async (id: string) => {
    uuidValidator('Project', id);

    const projectById = await projectModel.getProjectById(id);

    if (!projectById) {
        throw new HttpError(`Project not found by id ${id}, can't delete`, 404);
    }

    const deletedProject = await projectModel.deleteProjectById(id);

    return deletedProject;
};

export const projectService = {
    getAllProjects,
    getProjectById,
    createProject,
    deleteProject,
};
