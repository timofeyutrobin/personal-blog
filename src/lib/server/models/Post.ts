import {
    AllowNull,
    BelongsTo,
    Column,
    DataType,
    Default,
    ForeignKey,
    Model,
    Table
} from 'sequelize-typescript';
import { Cover } from '$lib/server/models/Cover';
import { PostType } from '$lib/types/posts';

@Table
export class Post extends Model {
    @AllowNull(false)
    @Default(PostType.MINI)
    @Column(DataType.ENUM(PostType.MINI, PostType.FULL))
    type!: PostType;

    @AllowNull(false)
    @Column(DataType.TEXT)
    title!: string;

    @Column(DataType.TEXT)
    description?: string;

    @Column(DataType.TEXT)
    slug?: string;

    @Default(new Date())
    @Column(DataType.DATE)
    date!: Date;

    @Column(DataType.TEXT)
    html?: string;

    @ForeignKey(() => Cover)
    @Column(DataType.INTEGER)
    coverId?: number;

    @BelongsTo(() => Cover)
    cover?: Cover;
}
