import { EnumUserRole } from '../interfaces/role.interface';
import { IUser } from '../interfaces/user.interface';
import {
    AllowNull,
    BelongsToMany,
    Column,
    CreatedAt,
    DataType,
    Default,
    ForeignKey,
    HasMany,
    IsEmail,
    IsUUID,
    Model,
    PrimaryKey,
    Table,
    Unique,
    Validate,
} from 'sequelize-typescript';
import { Project } from './project.model';
import { UserProject } from './userProject.model';
import { UserTask } from './userTask.model';
import { Task } from './task.model';

@Table
export class User extends Model<IUser> {
    @PrimaryKey
    @IsUUID(4)
    @AllowNull(false)
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id!: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    name!: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    last_name!: string;

    @AllowNull(false)
    @IsEmail
    @Unique
    @Column(DataType.STRING)
    email!: string;

    @AllowNull(false)
    // @Validate({ is: /^[0-9a-f]{64}$/i })
    @Column(DataType.STRING)
    password!: string;

    @CreatedAt
    @AllowNull(false)
    @Default(DataType.NOW)
    @Column(DataType.DATE)
    created_date!: Date;

    @AllowNull(false)
    @Default(EnumUserRole.Dev)
    @Column(DataType.ENUM(...Object.values(EnumUserRole)))
    role!: EnumUserRole;

    @Default(true)
    @Column(DataType.BOOLEAN)
    is_active!: boolean;

    @HasMany(() => Project, { foreignKey: 'created_by' })
    projects!: Project[];

    @BelongsToMany(() => Project, () => UserProject, 'user_id')
    userProjects!: UserProject[];

    @BelongsToMany(() => Task, () => UserTask, 'user_id')
    userTasks!: UserTask[];
}
