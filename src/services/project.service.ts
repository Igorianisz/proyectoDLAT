import { HttpError } from '../utils/error/httpError.utils';
import { projectModel } from '../models/project.model';
import { uuidValidator } from '../utils/error/uuidValidator.utils';
import {
    IProjects,
    UpdateProjectParams,
} from '../interfaces/project.interface';
import { EnumStatus } from '../interfaces/status.interface';

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

const updateProject = async (
    id: string,
    params: UpdateProjectParams,
    projectById: IProjects,
) => {
    const { name, description, start_date, end_date, status } = params;
    let updatedProject = { ...projectById };

    if (name) updatedProject.name = name;
    if (description) updatedProject.description = description;
    if (start_date) updatedProject.start_date = start_date;
    if (end_date) updatedProject.end_date = end_date;
    if (status) updatedProject.status = status as EnumStatus;

    const project = await projectModel.updateProject(id, updatedProject);
    return project;
};

export const projectService = {
    getAllProjects,
    getProjectById,
    createProject,
    deleteProject,
    updateProject,
};
