import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { EnumUserRole } from '../interfaces/role.interface';
import { verifyAccessToken } from '../utils/auth/token.util';

declare module 'express-serve-static-core' {
    interface Request {
        id?: string;
        name?: string;
        last_name?: string;
        email?: string;
        role?: EnumUserRole;
    }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        res.status(403).json({ error: `Bearer not found` });
        return;
    }

    const token = authHeader?.split(' ')[1];

    try {
        const payload = verifyAccessToken(token);
        req.email = payload.email;
        req.role = payload.role;
        next();
    } catch (error) {
        console.log(error);
        switch (true) {
            case error instanceof jwt.JsonWebTokenError:
                res.status(401).json({ error: 'Token invalid signature' });
                break;
            case error instanceof jwt.TokenExpiredError:
                res.status(401).json({ error: 'Token expired' });
                break;
            default:
                res.status(500).json({ error: 'Token Error' });
                break;
        }
        return;
    }
};

export const jwtMiddleware = {
    verifyToken,
};
