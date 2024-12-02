import { Request, Response } from "express";
import { authService } from "../services/auth.service";
import { userService } from "../services/user.service";

const loginByPassword = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const token = await authService.loginWithPassword(email, password)
        res.json({ token })
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
            return
        }
        res.status(500).json({ error: "Error de servidor" }); return
    }
}

const registerByPassword = async (req: Request, res: Response) => {

    try {
        const { name, lastName, email, password, rol } = req.body
        const newUsers = await userService.createUserWithEmailPassword(name, lastName, email, password, rol)
        res.json({ newUsers })
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
            return
        }
        res.status(500).json({ error: "Error de servidor" }); return
    }
}

export const authController = {
    loginByPassword, registerByPassword
}