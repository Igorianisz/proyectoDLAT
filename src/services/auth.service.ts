import { userService } from './user.service';
import bcrypt from 'bcrypt';
import { User } from '../models/user.model';
import { EnumUserRole } from '../interfaces/role.interface';
import { generateToken } from '../utils/auth/token.util';
import { HttpError } from '../utils/error/httpError.utils';

const loginWithPassword = async (email: string, password: string) => {
    const user = await User.findOne({ where: { email } });

    if (!user) {
        throw new HttpError(`Email or Password incorrect`, 404);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        throw new HttpError(`Email or Password incorrect`, 404);
    }

    const token = generateToken(
        user.id,
        user.name,
        user.last_name,
        email,
        user.role,
    );

    return token;
};

const registerUserByPassword = async (
    name: string,
    last_name: string,
    email: string,
    password: string,
    role: EnumUserRole,
) => {
    const newUser = await userService.createUserWithEmailPassword(
        name,
        last_name,
        email,
        password,
        role,
    );

    const token = generateToken(
        newUser.id,
        newUser.name,
        newUser.last_name,
        email,
        newUser.role,
    );

    return token;
};

export const authService = { loginWithPassword, registerUserByPassword };
