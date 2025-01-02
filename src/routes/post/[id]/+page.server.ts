import { getPost } from '$lib/server/database/controllers/postController.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
    const post = await getPost(params.id);

    if (!post) {
        error(404);
    }

    return post;
}
