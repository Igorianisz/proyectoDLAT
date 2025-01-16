import { NextFunction, Request, Response } from 'express';
import { authService } from '../services/auth.service';
import { userService } from '../services/user.service';
import { HttpError } from '../utils/error/httpError.utils';

const loginByPassword = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { email, password } = req.body;
        const token = await authService.loginWithPassword(email, password);
        res.status(200).json({ token });
    } catch (error) {
        next(error);
    }
};

const registerByPassword = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { name, last_name, email, password, role } = req.body;
        const token = await authService.registerUserByPassword(
            name,
            last_name,
            email,
            password,
            role,
        );
        res.status(201).json({ token });
    } catch (error) {
        next(error);
    }
};

export const authController = {
    loginByPassword,
    registerByPassword,
};
