import { Request, Response, NextFunction } from 'express';
import { EnumUserRole } from '../interfaces/role.interface';

const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.role !== EnumUserRole.Admin) {
        res.status(403).json({ error: 'Access denied: Admins only' });
        return;
    }
    next();
};

export const adminMiddleware = {
    verifyAdmin,
};
