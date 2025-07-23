import { getPostSnippets } from '$lib/server/controllers/postController';

export async function load() {
    const posts = await getPostSnippets();

    return {
        posts
    };
}
