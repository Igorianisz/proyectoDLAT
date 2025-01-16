import { HttpError } from '../utils/error/httpError.utils';
import { uuidValidator } from '../utils/error/uuidValidator.utils';
import { IProject, UpdateProjectParams } from '../interfaces/project.interface';
import { EnumStatus } from '../interfaces/status.interface';
import { Project } from '../models/project.model';

const getAllProjects = async () => {
    const project = await Project.findAll();
    return project;
};

const getProjectById = async (id: string) => {
    uuidValidator('project', id);
    const projectById = await Project.findOne({ where: { id } });

    if (!projectById) {
        throw new HttpError(`Project not found by id ${id}`, 404);
    }
    return projectById;
};

const createProject = async (id: string, name: string, description: string) => {
    const newProject = await Project.create({
        name,
        description,
        created_by: id,
    } as IProject);

    return newProject;
};

const deleteProject = async (id: string) => {
    uuidValidator('Project', id);

    const projectById = await Project.findOne({ where: { id } });

    if (!projectById) {
        throw new HttpError(`Project not found by id ${id}, can't delete`, 404);
    }

    const deletedProject = await Project.destroy({ where: { id } });

    return deletedProject;
};

const updateProject = async (
    id: string,
    params: UpdateProjectParams,
    projectById: IProject,
) => {
    const { name, description, start_date, end_date, status } = params;
    let updatedProject = { ...projectById };

    if (name) updatedProject.name = name;
    if (description) updatedProject.description = description;
    if (start_date) updatedProject.start_date = start_date;
    if (end_date) updatedProject.end_date = end_date;
    if (status) updatedProject.status = status as EnumStatus;

    const project = await Project.update(
        {
            name,
            description,
            start_date,
            end_date,
            status,
        } as IProject,
        { where: { id }, returning: true },
    );
    return project[1][0];
};

export const projectService = {
    getAllProjects,
    getProjectById,
    createProject,
    deleteProject,
    updateProject,
};
