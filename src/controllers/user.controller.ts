
import { Request, Response } from "express"
import { userService } from "../services/user.service";
import { EnumUserRole } from "../interfaces/rol.interface";


const getAllUsers = async (req: Request, res: Response) => {
    try {
        const userList = await userService.getAllUsers()
        res.json(userList)
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
            return
        }
        res.status(500).json({ error: "Error de servidor" });
        return
    }
}

const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const user = await userService.getUserById(id)
        res.json(user);
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
            return
        }
        res.status(500).json({ error: "Error de servidor" }); return
    }
}

const createUser = async (req: Request, res: Response) => {
    try {
        const { name, lastName, email, password, rol } = req.body
        const newUsers = await userService.createUserWithEmailPassword(name, lastName, email, password, rol)
        res.json({ newUsers })

    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
            return;
        }
        res.status(500).json({ error: "Error de servidor" });
        return;
    }
}

const updateUser = async (req: Request, res: Response) => {
    try {
        const { name, lastName, email, password, rol } = req.body
        const { id } = req.params
        const user = await userService.getUserById(id)

        if (req.email !== user.email && req.rol !== EnumUserRole.Admin) {
            res.status(403).json({ error: "Unauthorized: Only the user or an admin can update this information" });
            return;
        }
        const newUsers = await userService.updateUserData(id, name, lastName, email, password, rol)
        res.json({ newUsers })
        return;

    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
            return;
        }
        res.status(500).json({ error: "Error de servidor" });
        return;
    }
}

export const userController = {
    getAllUsers, getUserById, createUser, updateUser
}