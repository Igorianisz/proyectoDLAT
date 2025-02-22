import { EnumUserRole } from '../../interfaces/role.interface';
import { EnumStatus } from '../../interfaces/status.interface';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export const users = [
    {
        id: uuidv4(),
        name: 'Admin',
        last_name: 'User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('admin123', 10),
        role: EnumUserRole.Admin,
        created_date: new Date(),
        is_active: true,
    },
    {
        id: uuidv4(),
        name: 'Project',
        last_name: 'Manager',
        email: 'pm@example.com',
        password: bcrypt.hashSync('pm123', 10),
        role: EnumUserRole.PM,
        created_date: new Date(),
        is_active: true,
    },
    {
        id: uuidv4(),
        name: 'Developer',
        last_name: 'User',
        email: 'dev@example.com',
        password: bcrypt.hashSync('dev123', 10),
        role: EnumUserRole.Dev,
        created_date: new Date(),
        is_active: true,
    },
];

export const projects = [
    {
        id: uuidv4(),
        name: 'Project 1',
        description: 'Description for project 1',
        created_by: users[0].id,
        status: EnumStatus.notStarted,
        start_date: new Date(),
        end_date: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        created_date: new Date(),
    },
    {
        id: uuidv4(),
        name: 'Project 2',
        description: 'Description for project 2',
        created_by: users[1].id,
        status: EnumStatus.inProgress,
        start_date: new Date(),
        end_date: new Date(new Date().setMonth(new Date().getMonth() + 2)),
        created_date: new Date(),
    },
];

export const userProjectAssignments = [
    {
        userId: users[2].id,
        projectId: projects[0].id,
    },
    {
        userId: users[2].id,
        projectId: projects[1].id,
    },
    { userId: users[1].id, projectId: projects[1].id },
];
