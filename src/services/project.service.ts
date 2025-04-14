import { HttpError } from '../utils/error/httpError.utils';
import { uuidValidator } from '../utils/error/uuidValidator.utils';
import { IProject, UpdateProjectParams } from '../interfaces/project.interface';
import { EnumStatus } from '../interfaces/status.interface';
import { Project } from '../models/project.model';
import { UserProject } from '../models/userProject.model';
import { User } from '../models/user.model';

const getAllProjects = async () => {
    const project = await Project.findAll({
        include: [
            {
                model: User,
                as: 'users',
                attributes: ['id', 'name', 'last_name', 'email', 'role'],
                through: { attributes: [] },
            },
            {
                model: User,
                as: 'user',
                attributes: ['id', 'name', 'last_name', 'email', 'role'],
            },
        ],
    });
    return project;
};

const getProjectById = async (id: string) => {
    uuidValidator('project', id);
    const projectById = await Project.findOne({
        where: { id },
        include: [
            {
                model: User,
                as: 'users',
                attributes: ['id', 'name', 'last_name', 'email', 'role'],
                through: { attributes: [] },
            },
            {
                model: User,
                as: 'user',
                attributes: ['id', 'name', 'last_name', 'email', 'role'],
            },
        ],
    });

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

const assingUserToProject = async (userId: string, projectId: string) => {
    const project = await UserProject.create({
        user_id: userId,
        project_id: projectId,
    });

    return project;
};

const removeUserFromProject = async (userId: string, projectId: string) => {
    const deleteUserFromProject = await UserProject.destroy({
        where: { user_id: userId, project_id: projectId },
    });
    return deleteUserFromProject;
};

export const projectService = {
    getAllProjects,
    getProjectById,
    createProject,
    deleteProject,
    updateProject,
    assingUserToProject,
    removeUserFromProject,
};
