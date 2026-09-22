import type { PostMetadata } from '$lib/types/posts';

function getPosts(): (PostMetadata & { id: string })[] {
    const modules = import.meta.glob<PostMetadata>('$lib/posts/*.md', {
        eager: true,
        import: 'metadata'
    });

    const posts = [];
    for (const path in modules) {
        const metadata = modules[path];
        const id = path.split('/').pop()?.replace('.md', '');
        if (!id) {
            throw new SyntaxError('Post file name is missing');
        }

        posts.push({
            id,
            ...metadata
        });
    }

    return posts;
}

export async function load() {
    return {
        posts: getPosts()
    };
}
