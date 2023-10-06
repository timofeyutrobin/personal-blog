import { error } from '@sveltejs/kit';
import { posts, type IPost } from '$lib/mocks/snippet';

export function load({ params }): IPost {
    const post = posts.find(posts => posts.id === params.id);

    if (!post) {
        throw error(404);
    }

    return post;
}
