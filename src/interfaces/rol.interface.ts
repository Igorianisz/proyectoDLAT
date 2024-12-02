export enum EnumUserRole {
    Admin = 'Admin',
    User = 'User',
    Guest = 'Guest'
}

export interface IRol {
    role: EnumUserRole;
}