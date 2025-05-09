import { IProject } from '../interfaces/project.interface';
import {
    AllowNull,
    BelongsTo,
    BelongsToMany,
    Column,
    CreatedAt,
    DataType,
    Default,
    ForeignKey,
    HasMany,
    IsUUID,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';
import { EnumStatus } from '../interfaces/status.interface';
import { User } from './user.model';
import { Task } from './task.model';
import { UserProject } from './userProject.model';
@Table
export class Project extends Model<IProject> {
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

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.UUID)
    created_by!: string;

    @BelongsTo(() => User, { foreignKey: 'created_by' })
    user!: User;

    @HasMany(() => Task, { foreignKey: 'project_id' })
    tasks!: Task[];

    @BelongsToMany(() => User, () => UserProject, 'project_id')
    users!: User[];
}
