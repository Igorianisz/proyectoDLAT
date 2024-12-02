import { userService } from "./user.service"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const secretKey = process.env.SECRET_KEY_JTW || "ZZXXCCVV1"

const loginWithPassword = async (email: string, password: string) => {

    const usersList = await userService.getAllUsers()
    const user = usersList.find((user) => user.email === email)
    console.log(email, usersList)

    if (!user) {
        throw new Error(`Email or Password incorrect`)
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
        throw new Error(`Email or Password incorrect`)
    }

    // TODO: setear hora de expiración adecuada al proyecto
    const token = jwt.sign({ id: user.id, email, rol: user.rol }, secretKey, { expiresIn: '4h' })

    return token
}

export const authService = { loginWithPassword }