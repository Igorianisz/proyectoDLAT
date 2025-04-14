import Joi from 'joi';
import { EnumUserRole } from '../../interfaces/role.interface';

const roleValues = Object.values(EnumUserRole);

export const createUserSchema = Joi.object({
    name: Joi.string().required().messages({
        'any.required': 'Name is required',
    }),
    last_name: Joi.string().required().messages({
        'any.required': 'Last name is required',
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Email must be valid',
        'any.required': 'Email is required',
    }),
    password: Joi.string().required().messages({
        'any.required': 'Password is required',
    }),
    role: Joi.string()
        .valid(...roleValues)
        .optional()
        .messages({
            'any.only': 'Role must be a valid one',
        }),
});

export const updateUserSchema = Joi.object({
    name: Joi.string().optional(),
    last_name: Joi.string().optional(),
    email: Joi.string().email().optional().messages({
        'string.email': 'Email must be valid',
    }),
    password: Joi.string().optional(),
    role: Joi.string()
        .valid(...roleValues)
        .optional()
        .messages({
            'any.only': 'Role must be a valid one',
        }),
});

export const getUserByIdSchema = Joi.object({
    id: Joi.string().uuid().required().messages({
        'any.required': 'User ID is required',
        'string.uuid': 'User ID must be a valid UUID',
    }),
});

export const deleteUserSchema = Joi.object({
    id: Joi.string().uuid().required().messages({
        'any.required': 'User ID is required',
        'string.uuid': 'User ID must be a valid UUID',
    }),
});
