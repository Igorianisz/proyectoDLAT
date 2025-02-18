import { Request, Response, NextFunction } from 'express';

import logger from '../utils/log/logger.utils';

export const loggerMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    logger.info(`${req.url} ${req.method} - ${JSON.stringify(req.body || [])}`);
    next();
};
