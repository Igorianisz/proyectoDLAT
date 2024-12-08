import { EnumUserRole } from '../interfaces/role.interface';
import { pool } from '../config/database';
import { IUser } from '../interfaces/user.interface';

const createUser = async (
    name: string,
    last_name: string,
    email: string,
    password: string,
    role: EnumUserRole,
) => {
    const query = {
        text: `
        INSERT INTO USERS (name, last_name, email, password, role)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        `,
        values: [name, last_name, email, password, role],
    };

    const { rows } = await pool.query(query);

    console.log(rows);
    return rows[0] as IUser;
};

const readUsers = async () => {
    const query = {
        text: `
        SELECT *
        FROM USERS
        `,
    };

    const { rows } = await pool.query(query);

    console.log(rows);
    return rows as IUser[];
};

const getUserByEmail = async (email: string) => {
    console.log(email);
    const query = {
        text: `
        SELECT * from USERS
        WHERE email = $1
        `,
        values: [email],
    };

    const { rows } = await pool.query(query);

    return rows[0] as IUser;
};

const getUserById = async (id: string) => {
    const query = {
        text: `
        SELECT * from USERS
        WHERE id = $1
        `,
        values: [id],
    };

    const { rows } = await pool.query(query);

    return rows[0] as IUser;
};

const updateUserById = async (id: string, changes: string[]) => {
    const query = {
        text: `
        UPDATE USERS
        SET
            name = COALESCE($1, name),
            last_name = COALESCE($2, last_name),
            email = COALESCE($3, email),
            password = COALESCE($4, password),
            role = COALESCE($5, role)
        WHERE id = $6
        RETURNING *;`,
        values: changes,
    };
    const { rows } = await pool.query(query);

    return rows[0] as IUser;
};

const deleteUserById = async (id: string) => {
    const query = {
        text: `
        DELETE FROM USERS
        WHERE id = $1 
        RETURNING *`,
        values: [id],
    };

    const { rows } = await pool.query(query);

    return rows[0] as IUser;
};

export const userModel = {
    readUsers,
    createUser,
    getUserByEmail,
    getUserById,
    updateUserById,
    deleteUserById,
};
