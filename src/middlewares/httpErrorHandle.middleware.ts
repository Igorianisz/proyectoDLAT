import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../utils/error/httpError.utils';
import logger from '../utils/log/logger.utils';

export const httpErrorHandle = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    console.log(error);
    logger.error(
        `${req.url} ${req.method} ${error.message} - ${JSON.stringify(
            req.body || [],
        )}`,
    );
    if (error instanceof HttpError) {
        res.status(error.code).json({ error: error.message });
        return;
    }
    res.status(500).json({ error: 'Error de servidor' });
    return;
};
