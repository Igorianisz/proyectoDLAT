import { EnumStatus } from '../interfaces/status.interface';
import { ITask } from '../interfaces/task.interface';
import {
    AllowNull,
    BelongsTo,
    BelongsToMany,
    Column,
    CreatedAt,
    DataType,
    Default,
    ForeignKey,
    IsEmail,
    IsUUID,
    Model,
    PrimaryKey,
    Table,
    Unique,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Project } from './project.model';
import { UserTask } from './userTask.model';

@Table
export class Task extends Model<ITask> {
    @PrimaryKey
    @AllowNull(false)
    @IsUUID(4)
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id!: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    name!: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    description!: string;

    @CreatedAt
    @Default(DataType.NOW)
    @Column(DataType.DATE)
    created_date!: Date;

    @AllowNull(true)
    @Column(DataType.DATE)
    start_date!: Date;

    @AllowNull(true)
    @Column(DataType.DATE)
    end_date!: Date;

    @AllowNull(false)
    @Default(EnumStatus.notStarted)
    @Column(DataType.ENUM(...Object.values(EnumStatus)))
    status!: EnumStatus;

    @ForeignKey(() => Project)
    @AllowNull(false)
    @Column(DataType.UUID)
    project_id!: string;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.UUID)
    created_by!: string;

    @BelongsTo(() => Project, { foreignKey: 'project_id' })
    project!: Project;

    @BelongsTo(() => User, { foreignKey: 'created_by' })
    user!: User;

    @BelongsToMany(() => User, () => UserTask, 'task_id')
    users!: User[];
}
