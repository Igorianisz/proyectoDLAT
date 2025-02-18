import { pool } from '../config/database';
import {
    IProjects,
    UpdateProjectParams,
} from '../interfaces/project.interface';

const createProject = async (id: string, name: string, description: string) => {
    console.log('waaa', id, name, description);
    const query = {
        text: `
        INSERT INTO projects (name,description,created_by)
        VALUES ($1,$2,$3)
        RETURNING *

        `,
        values: [name, description, id],
    };

    const { rows } = await pool.query(query);
    return rows[0] as IProjects;
};

const getAllProjects = async () => {
    const query = {
        text: `SELECT * FROM projects`,
    };
    const { rows } = await pool.query(query);
    console.log(rows);
    return rows as IProjects[];
};

const getProjectById = async (id: string) => {
    const query = {
        text: `SELECT * FROM projects WHERE id = $1`,
        values: [id],
    };

    const { rows } = await pool.query(query);
    return rows[0] as IProjects;
};

const deleteProjectById = async (id: string) => {
    const query = {
        text: `
        DELETE FROM projects
        WHERE id = $1 
        RETURNING *`,
        values: [id],
    };

    const { rows } = await pool.query(query);

    return rows[0] as IProjects;
};

const updateProject = async (id: string, params: UpdateProjectParams) => {
    const { name, description, start_date, end_date, status } = params;

    const query = {
        text: `
       UPDATE projects
        SET
            name = COALESCE($1, name),
            description = COALESCE($2, description),
            start_date = COALESCE($3, start_date),
            end_date = COALESCE($4, end_date),
            status = COALESCE($5, status)
        WHERE id = $6
        RETURNING *;`,
        values: [name, description, start_date, end_date, status, id],
    };

    const { rows } = await pool.query(query);

    return rows[0] as IProjects;
};

export const projectModel = {
    createProject,
    getAllProjects,
    getProjectById,
    deleteProjectById,
    updateProject,
};
