import { EnumUserRole } from './role.interface';
import { IStatus } from './status.interface';

export interface ITask {
    id: string;
    title: string;
    description: string;
    project_id: string;
    status: IStatus;
    created_at: Date;
    start_date?: Date;
    end_date?: Date;
    created_by: string;
}

export interface ITaskUser {
    user_id: string;
    task_id: string;
}
