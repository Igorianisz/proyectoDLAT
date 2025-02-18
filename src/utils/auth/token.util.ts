import { EnumUserRole } from '../../interfaces/role.interface';
import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY_JWT || 'AXXXAf/14ACX';

export const generateToken = (
    id: string,
    name: string,
    last_name: string,
    email: string,
    role: EnumUserRole,
    expiresIn = '2h',
) => {
    return jwt.sign({ id, name, last_name, email, role }, secretKey, {
        expiresIn,
    });
};

export const verifyAccessToken = (token: string) => {
    return jwt.verify(token, secretKey) as jwt.JwtPayload;
};

export const getTokenPayload = (token: string) => {
    const { id, name, last_name, email, role } = verifyAccessToken(
        token,
    ) as jwt.JwtPayload;

    return { id, name, last_name, email, role };
};
