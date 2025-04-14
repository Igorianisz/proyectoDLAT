import Joi from 'joi';
import { EnumUserRole } from '../../interfaces/role.interface';

const roleValues = Object.values(EnumUserRole);

export const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Email must be valid',
        'any.required': 'Email is required',
    }),
    password: Joi.string().required().messages({
        'any.required': 'Password is required',
    }),
});

export const registerSchema = Joi.object({
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
