import { Post } from '$lib/server/models/Post';
import type { PostModel, PostSnippetModel } from '$lib/types/posts';
import { Cover } from '../models/Cover';

export const getPostSnippets = async (): Promise<PostSnippetModel[]> => {
    const postSnippets = await Post.findAll({
        attributes: { exclude: ['html'] },
        include: Cover
    });

    return postSnippets.map((snippet) => snippet.get({ plain: true })) || [];
};

export const getPost = async (id: number): Promise<PostModel | null> => {
    const post = await Post.findByPk(id);

    return post?.get({ plain: true }) || null;
};
