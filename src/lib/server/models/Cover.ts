import { AllowNull, Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Post } from '$lib/server/models/Post';

@Table
export class Cover extends Model {
    @AllowNull(false)
    @Column(DataType.TEXT)
    src!: string;

    @Column(DataType.TEXT)
    alt?: string;

    @HasMany(() => Post)
    posts?: Post[];
}
