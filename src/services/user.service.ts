import bcrypt from 'bcrypt';
import { EnumUserRole } from '../interfaces/role.interface';
import { HttpError } from '../utils/error/httpError.utils';
import { validate } from 'uuid';
import { uuidValidator } from '../utils/error/uuidValidator.utils';
import { User } from '../models/user.model';
import { IUser } from '../interfaces/user.interface';

const getAllUsers = async () => {
    const users = await User.findAll({
        attributes: { exclude: ['password'] },
    });
    return users;
};

const getUserById = async (userId: string) => {
    uuidValidator('User', userId);
    const userById = await User.findByPk(userId);
    if (!userById) {
        throw new HttpError(`User not found by id ${userId}`, 404);
    }
    return userById.toJSON();
};

const getUserByEmail = async (userEmail: string) => {
    const userByEmail = await User.findOne({ where: { email: userEmail } });
    if (!userByEmail) {
        throw new HttpError(`User not found by email ${userByEmail}`, 404);
    }
    return userByEmail.toJSON();
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
    // Encriptación de la contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(password, salt);

    const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: {
            name,
            last_name,
            email,
            password: passwordHashed,
            role,
        } as IUser,
    });

    console.log(user, created);

    if (!created) {
        throw new HttpError(
            `The current email ${email} is already on use.`,
            409,
        );
    }
    return user;
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
        const getUserByEmail = await User.findOne({ where: { email } });
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
        console.log('entra a ver', password, salt, findUserById);
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

    await User.update(updatedUser, { where: { id } });
};

const deleteUser = async (id: string) => {
    uuidValidator('User', id);

    const findUserById = await getUserById(id);

    if (!findUserById) {
        throw new HttpError(`No user found, can't delete`, 404);
    }
    await User.destroy({ where: { id } });
};

// const toggleUserActive = async (id: string, is_active: boolean) => {
//     uuidValidator('User', id);
//     const findUserById = await getUserById(id);

//     if (!findUserById) {
//         throw new HttpError(`No user found`, 404);
//     }

//     await User.update({ is_active }, { where: { id } });
// };

export const userService = {
    getAllUsers,
    getUserById,
    createUserWithEmailPassword,
    updateUserData,
    getUserByEmail,
    deleteUser,
    // toggleUserActive,
};
