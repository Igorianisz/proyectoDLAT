import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

const validateReqBody = (schema: ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((detail) => detail.message);
            res.status(400).json({ errors });
            return;
        }
        next();
        return;
    };
};

export const validateBody = {
    validateReqBody,
};
