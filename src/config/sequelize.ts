import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/user.model';
import { Project } from '../models/project.model';
import { Task } from '../models/task.model';
import { UserProject } from '../models/userProject.model';
import { UserTask } from '../models/userTask.model';

const URI =
    process.env.DATABASE_URL ||
    'postgresql://postgres:root@localhost:5434/dbtest';

export const sequelize = new Sequelize(URI, {
    dialect: 'postgres',
    models: [User, Project, Task, UserProject, UserTask],
    logging: console.log,
});
