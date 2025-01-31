import type { PostModel, PostSnippetModel } from '$lib/types/posts';
import { db } from '..';

export const getPostSnippets = async (): Promise<PostSnippetModel[]> => {
    const { data } = await db.from('posts').select(`
        id,
        type,
        title,
        description,
        slug,
        date,
        cover (src, alt)
    `);
    

    return data || [];
};

export const getPost = async (id: number): Promise<PostModel | null> => {
    const { data } = await db.from('posts').select(`
        id,
        type,
        title,
        description,
        slug,
        date,
        html,
        cover (src, alt)
    `).eq('id', id).single();

    return data;
};
