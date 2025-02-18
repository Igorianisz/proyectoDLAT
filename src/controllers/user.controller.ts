import { NextFunction, Request, Response } from 'express';
import { userService } from '../services/user.service';
import { EnumUserRole } from '../interfaces/role.interface';

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userList = await userService.getAllUsers();
        res.status(200).json(userList);
    } catch (error) {
        next(error);
    }
};

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const user = await userService.getUserById(id);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, last_name, email, password, role } = req.body;
        const newUsers = await userService.createUserWithEmailPassword(
            name,
            last_name,
            email,
            password,
            role,
        );
        res.status(201).json({ newUsers });
    } catch (error) {
        next(error);
    }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, last_name, email, password, role } = req.body;
        const { id } = req.params;
        const user = await userService.getUserById(id);

        if (req.email !== user.email && req.role !== EnumUserRole.Admin) {
            res.status(403).json({
                error: 'Unauthorized: Only the user or an admin can update this information',
            });
            return;
        }
        const newUsers = await userService.updateUserData(
            id,
            name,
            last_name,
            email,
            password,
            role,
        );
        res.status(200).json({ newUsers });
        return;
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const deletedUser = await userService.updateUserData(id);
        res.status(201).json(deletedUser);
    } catch (error) {
        next(error);
    }
};

const toggleUserActivate = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { isActive } = req.body;
        const { id } = req.params;
        const toogleUser = await userService.toggleUserActive(id, isActive);
        res.status(201).json(toogleUser);
    } catch (error) {
        next(error);
    }
};

export const userController = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    toggleUserActivate,
};
