import { IUser } from "../interfaces/user.interface";
import { userModel } from "../models/user.model";
import { v6 } from "uuid";

import bcrypt from "bcrypt";
import { EnumUserRole } from "../interfaces/rol.interface";

const getAllUsers = async () => {
    const users = await userModel.readUsers();
    return users;
};

const getUserById = async (userId: string) => {
    const users = await getAllUsers();
    const userById = users.find(({ id }) => id === userId);
    if (!userById) {
        throw new Error(`User not found by id ${userId}`);
    }
    return userById;
};

// TODO:  crear login con cuentas de google y microsoft, agregar otros a futuro como facebook quizas
const createUserByGoogle = async () => { };
const createUserByMicrosoft = async () => { };

const createUserWithEmailPassword = async (
    name: string,
    lastName: string,
    email: string,
    password: string,
    rol: EnumUserRole = EnumUserRole.Guest
) => {
    // validaciones de nombre/apellido/ y otros es de front

    const users = await getAllUsers();
    const findUserByEmail = users.find((user) => user.email === email);

    if (findUserByEmail) {
        throw new Error(`The current email ${email} is already on use.`);
    }

    // Encriptación de la contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(password, salt);

    const newUser: IUser = {
        id: v6(),
        name,
        lastName,
        email,
        password: passwordHashed,
        rol,
    };

    users.push(newUser);

    console.log(
        `Created user ${name} ${lastName} with email ${email} and rol ${rol}`
    );
    await userModel.writeUsers(users);
};

const updateUserData = async (
    id: string,
    name?: string,
    lastName?: string,
    email?: string,
    password?: string,
    rol?: EnumUserRole
) => {
    // validaciones a nivel de formulario
    const users = await getAllUsers();

    //Revisa y obtiene index del usuario en "db", para posteriormente tener la referencia y actualizar su data
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
        throw new Error(`No user found`);
    }

    const findUserById = users[userIndex];
    let updatedUser = { ...findUserById };

    // Lista de if para actualización si es que se entrego el prop en el post inicial.
    // ya que solo el ID es obligatorio
    if (name) updatedUser.name = name;
    if (lastName) updatedUser.lastName = lastName;
    if (rol) updatedUser.rol = rol;
    if (email) {
        const getUserByEmail = users.find((user) => user.email === email);
        if (getUserByEmail) {
            throw new Error(`The current email ${email} is already on use.`);
        } else {
            updatedUser.email = email;
        }
    }
    if (password) {
        const salt = await bcrypt.genSalt(10);
        const passwordHashed = await bcrypt.hash(password, salt);
        const samePassword = await bcrypt.compare(password, findUserById.password);
        if (samePassword) {
            throw new Error(`You can't pick the same password`);
        } else {
            updatedUser.password = passwordHashed;
        }
    }

    users[userIndex] = updatedUser;

    await userModel.writeUsers(users);

    console.log(`Created user ${name} ${lastName} with email ${email}`);

    await userModel.writeUsers(users);
};

export const userService = {
    getAllUsers,
    getUserById,
    createUserWithEmailPassword,
    updateUserData,
};
