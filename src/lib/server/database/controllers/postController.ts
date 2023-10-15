import type { Image } from '$lib/types/common';
import { ObjectId } from 'mongodb';
import { db } from '..';

export enum PostType {
    SIMPLE,
    ONLY_PHOTOS,
    FREE_LAYOUT
}

export interface IPost {
    id: string;
    type: PostType;
    title: string;
    description: string;
    cover?: Image;
    slug: string;
    date: Date;
    html: string;
}

export type IPostSnippet = Omit<IPost, 'html'>;

const collection = db.collection('posts');

export const getPostSnippets = (): Promise<IPostSnippet[]> =>
    collection
        .find({})
        .project({ html: 0 })
        .map<IPostSnippet>((post) => ({
            id: post._id.toString(),
            slug: post.slug,
            type: post.type,
            title: post.title,
            description: post.description,
            date: post.date,
            cover: post.cover
        }))
        .toArray();

export const getPost = async (id: string): Promise<IPost | null> => {
    const post = await collection.findOne({ _id: ObjectId.createFromHexString(id) });

    if (!post) {
        return null;
    }

    return {
        id: post._id.toString(),
        slug: post.slug,
        type: post.type,
        title: post.title,
        description: post.description,
        date: post.date,
        cover: post.cover,
        html: post.html
    };
};
