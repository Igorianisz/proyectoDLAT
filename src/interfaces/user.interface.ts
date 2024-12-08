import { EnumUserRole } from './role.interface';

export interface IUser {
    id: string;
    name: string;
    last_name: string;
    email: string;
    password: string;
    created_date: Date;
    role: EnumUserRole;
}
