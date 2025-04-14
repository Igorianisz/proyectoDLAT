import { EnumUserRole } from './role.interface';

export interface IUser {
    id: string;
    name: string;
    last_name: string;
    email: string;
    password: string;
    created_date: Date;
    role: EnumUserRole;
    is_active: boolean;
}

export interface ICreateUser {
    name: string;
    last_name: string;
    email: string;
    password: string;
    role?: EnumUserRole;
}
