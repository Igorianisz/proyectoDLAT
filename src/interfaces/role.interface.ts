export enum EnumUserRole {
    Admin = 'Admin',
    PM = 'PM',
    Dev = 'Dev',
    Client = 'Client'
}

export interface IRole {
    role: EnumUserRole;
}