import path from "node:path";
import { IUser } from "../interfaces/user.interface";
import { readFile, writeFile } from "node:fs/promises";

// Estructura para escritura de archivo, debiese a futuro utilizar SQL y postgress
// o algun gestor de DB

const __dirname = import.meta.dirname;
const dataPath = process.env.DATA_PATH || '../../data/users.json'

const pathFile = path.resolve(__dirname, dataPath);

const readUsers = async () => {
    const usersJSON = await readFile(pathFile, "utf-8");
    const users = JSON.parse(usersJSON) as IUser[];
    return users;
};

const writeUsers = async (user: IUser[]) => {
    const userJSON = JSON.stringify(user)
    await writeFile(pathFile, userJSON)
}

export const userModel = {
    readUsers, writeUsers
};
