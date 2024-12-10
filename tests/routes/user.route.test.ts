import { describe, expect, test, it, vi } from 'vitest';

import request from 'supertest';
import app from '../../src/app';
import { EnumUserRole } from '../../src/interfaces/role.interface';

import {} from '../../src';

const mainPath = process.env.MAIN_PATH || '/api/v1';

const mockUser = {
    id: '3b7e169d-73bc-4a4a-b5ae-32de8dd86c6d',
    name: 'nameTest',
    last_name: 'lastNameTest',
    email: 'test@test.123',
    password: 'testPass',
    role: EnumUserRole.Admin,
};

const { id, name, last_name, email, password, role } = mockUser;

vi.mock('../../src/models/user.model', () => {
    return {
        userModel: {
            readUsers: vi.fn(async () => []),
            createUser: vi.fn(async () => []),
            getUserByEmail: vi.fn(async () => []),
            getUserById: vi.fn(async (userId) => {
                if (userId === id) {
                    return { id, name, last_name, email, password, role };
                }
                return;
            }),
            updateUserById: vi.fn(async () => []),
            deleteUserById: vi.fn(async () => []),
        },
    };
});

vi.mock('../../src/middlewares/jwt.middleware', () => {
    return {
        jwtMiddleware: {
            verifyToken: vi.fn((req, res, next) => {
                req.email = email;
                req.id = id;
                req.role = role;
                next();
            }),
        },
    };
});

describe('GET /user', () => {
    const path = `${mainPath}/user`;
    it('should return users if valid toked', async () => {
        const response = await request(app).get(path);
        const { statusCode, body } = response;
        expect(body).toEqual([]);
        expect(statusCode).toBe(200);
    });

    it('Shouldnt return users if not auth', async () => {
        const response = await request(app)
            .get('/user')
            .set('Authorization', 'Bearer invalidtoken');
        const { statusCode } = response;
        expect(statusCode).toBe(404);
    });
});

describe('GET /user/:id', () => {
    const path = `${mainPath}/user/${id}`;
    const invalidUser = `${mainPath}/user/${22222222222222}`;
    it('should return user if valid toked', async () => {
        const response = await request(app).get(path);
        const { statusCode, body } = response;

        console.log(body, statusCode, path);
        expect(body).toEqual(mockUser);
        expect(statusCode).toBe(200);
    });

    it('Shouldnt return user if not auth', async () => {
        const response = await request(app)
            .get('/user')
            .set('Authorization', 'Bearer invalidtoken');
        const { statusCode } = response;
        expect(statusCode).toBe(404);
    });
    it('Shouldnt return user if not valid / doesnt exist ID', async () => {
        const response = await request(app).get(invalidUser);
        const { statusCode, body } = response;

        console.log(statusCode, body);

        expect(statusCode).toBe(404);
    });
});
