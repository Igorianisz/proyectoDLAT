import {
    AllowNull,
    Column,
    DataType,
    Default,
    ForeignKey,
    IsUUID,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Task } from './task.model';

@Table
export class UserTask extends Model {
    @PrimaryKey
    @IsUUID(4)
    @AllowNull(false)
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id!: string;

    @ForeignKey(() => User)
    @AllowNull(false)
    @IsUUID(4)
    @Column(DataType.UUID)
    user_id!: string;

    @ForeignKey(() => Task)
    @AllowNull(false)
    @IsUUID(4)
    @Column(DataType.UUID)
    task_id!: string;
}
