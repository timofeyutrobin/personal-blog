import { getPostSnippets } from '$lib/server/database/controllers/postController';

export async function load() {
    const posts = await getPostSnippets();

    return {
        posts
    };
}
