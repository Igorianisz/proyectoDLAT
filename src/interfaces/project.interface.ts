import { EnumStatus } from './status.interface';

export interface IProjects {
    id: string;
    name: string;
    description: string;
    created_date: Date;
    start_date?: Date;
    end_date?: Date;
    status: EnumStatus;
    created_by: string;
}

export interface IProjectUser {
    project_id: string;
    user_id: string;
}
