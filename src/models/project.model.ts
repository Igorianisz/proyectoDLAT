import { pool } from '../config/database';
import { IProjects } from '../interfaces/project.interface';

const createProject = async (id: string, name: string, description: string) => {
    console.log('waaa', id, name, description);
    const query = {
        text: `
        INSERT INTO project (name,description,created_by)
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
        text: `SELECT * FROM project`,
    };
    const { rows } = await pool.query(query);
    return rows[0] as IProjects;
};

const getProjectById = async (id: string) => {
    const query = {
        text: `SELECT * FROM project WHERE id = $1`,
        values: [id],
    };

    const { rows } = await pool.query(query);
    return rows[0] as IProjects;
};

const deleteProjectById = async (id: string) => {
    const query = {
        text: `
        DELETE FROM project
        WHERE id = $1 
        RETURNING *`,
        values: [id],
    };

    const { rows } = await pool.query(query);

    return rows[0] as IProjects;
};

export const projectModel = {
    createProject,
    getAllProjects,
    getProjectById,
    deleteProjectById,
};
