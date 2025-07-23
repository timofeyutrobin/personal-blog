import { getPost } from '$lib/server/controllers/postController.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
    const post = await getPost(parseInt(params.id));

    if (!post) {
        error(404);
    }

    return post;
}
