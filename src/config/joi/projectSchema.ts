import Joi from 'joi';
import { EnumStatus } from '../../interfaces/status.interface';

const statusValues = Object.values(EnumStatus);

export const createProjectSchema = Joi.object({
    name: Joi.string().required().messages({
        'any.required': 'Name is required',
    }),
    description: Joi.string().required().messages({
        'any.required': 'Description is required',
    }),
});

export const updateProjectSchema = Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    start_date: Joi.date().optional().messages({
        'date.base': 'Start date must be a valid date',
    }),
    end_date: Joi.date().optional().messages({
        'date.base': 'End date must be a valid date',
    }),
    status: Joi.string()
        .optional()
        .valid(...statusValues)
        .optional()
        .messages({
            'any.only': 'Status must be a valid one',
        }),
});

export const getProjectByIdSchema = Joi.object({
    id: Joi.string().uuid().required().messages({
        'any.required': 'Project ID is required',
        'string.uuid': 'Project ID must be a valid UUID',
    }),
});

export const deleteProjectSchema = Joi.object({
    id: Joi.string().uuid().required().messages({
        'any.required': 'Project ID is required',
        'string.uuid': 'Project ID must be a valid UUID',
    }),
});
