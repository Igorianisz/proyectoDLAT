import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { EnumUserRole } from "../interfaces/rol.interface";

declare module "express-serve-static-core" {
    interface Request {
        email?: string;
        rol?: EnumUserRole
    }
}

const secretKey = process.env.SECRET_KEY_JTW || "ZZXXCCVV1"

const verifyToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const authHeader = req.headers['authorization']

    if (!authHeader) {
        res.status(403).json({ error: `Bearer not found` })
        return
    }

    const token = authHeader?.split(' ')[1]

    try {
        const payload = jwt.verify(token, secretKey) as jwt.JwtPayload
        req.email = payload.email
        req.rol = payload.rol
        next()
    }
    catch (error) {
        console.log(error);
        switch (true) {
            case error instanceof jwt.JsonWebTokenError:
                res.status(401).json({ error: "Token invalid signature" });
                break;
            case error instanceof jwt.TokenExpiredError:
                res.status(401).json({ error: "Token expired" });
                break;
            default:
                res.status(500).json({ error: "Token Error" });
                break;
        }
        return
    }
}


export const jwtMiddleware = {
    verifyToken
}