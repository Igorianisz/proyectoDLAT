import { userModel } from '../models/user.model';

import bcrypt from 'bcrypt';
import { EnumUserRole } from '../interfaces/role.interface';
import { HttpError } from '../utils/error/httpError.utils';
import { validate } from 'uuid';
import { uuidValidator } from '../utils/error/uuidValidator.utils';

const getAllUsers = async () => {
    const users = await userModel.readUsers();
    return users;
};

const getUserById = async (userId: string) => {
    uuidValidator('User', userId);
    const userById = await userModel.getUserById(userId);
    console.log(userById);
    if (!userById) {
        throw new HttpError(`User not found by id ${userId}`, 404);
    }
    return userById;
};

const getUserByEmail = async (userEmail: string) => {
    const userByEmail = await userModel.getUserByEmail(userEmail);
    if (!userByEmail) {
        throw new HttpError(`User not found by email ${userByEmail}`, 404);
    }
    return userByEmail;
};

// TODO:  crear login con cuentas de google y microsoft, agregar otros a futuro como facebook quizas
const createUserByGoogle = async () => {};
const createUserByMicrosoft = async () => {};

const createUserWithEmailPassword = async (
    name: string,
    last_name: string,
    email: string,
    password: string,
    role: EnumUserRole = EnumUserRole.Dev,
) => {
    // validaciones de nombre/apellido/ y otros es de front

    const findUserByEmail = await userModel.getUserByEmail(email);

    if (findUserByEmail) {
        throw new HttpError(
            `The current email ${email} is already on use.`,
            409,
        );
    }

    // Encriptación de la contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(password, salt);

    const newUser = await userModel.createUser(
        name,
        last_name,
        email,
        passwordHashed,
        role,
    );
    return newUser;
};

const updateUserData = async (
    id: string,
    name?: string,
    last_name?: string,
    email?: string,
    password?: string,
    role?: EnumUserRole,
) => {
    uuidValidator('User', id);
    const findUserById = await getUserById(id);

    if (!findUserById) {
        throw new HttpError(`No user found`, 404);
    }

    let updatedUser = { ...findUserById };

    // Lista de if para actualización si es que se entrego el prop en el post inicial.
    // ya que solo el ID es obligatorio
    if (name) updatedUser.name = name;
    if (last_name) updatedUser.last_name = last_name;
    if (role) updatedUser.role = role;
    if (email) {
        const getUserByEmail = await userModel.getUserByEmail(email);
        if (getUserByEmail) {
            throw new HttpError(
                `The current email ${email} is already on use.`,
                409,
            );
        } else {
            updatedUser.email = email;
        }
    }
    if (password) {
        const salt = await bcrypt.genSalt(10);
        const passwordHashed = await bcrypt.hash(password, salt);
        const samePassword = await bcrypt.compare(
            password,
            findUserById.password,
        );
        if (samePassword) {
            throw new HttpError(`You can't pick the same password`, 400);
        } else {
            updatedUser.password = passwordHashed;
        }
    }

    await userModel.updateUserById(id, [
        updatedUser.name,
        updatedUser.last_name,
        updatedUser.email,
        updatedUser.password,
        updatedUser.role,
    ]);
};

const deleteUser = async (id: string) => {
    uuidValidator('User', id);

    const findUserById = await getUserById(id);

    if (!findUserById) {
        throw new HttpError(`No user found, can't delete`, 404);
    }
    await userModel.deleteUserById(id);
};

const toggleUserActive = async (id: string, is_active: boolean) => {
    uuidValidator('User', id);
    const findUserById = await getUserById(id);

    if (!findUserById) {
        throw new HttpError(`No user found`, 404);
    }

    await userModel.toggleActiveById(id, is_active);
};

export const userService = {
    getAllUsers,
    getUserById,
    createUserWithEmailPassword,
    updateUserData,
    getUserByEmail,
    deleteUser,
    toggleUserActive,
};
