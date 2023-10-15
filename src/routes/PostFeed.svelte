<script lang="ts">
    import type { IPostSnippet } from '$lib/server/database/controllers/postController';
    import PostSnippet from './PostSnippet.svelte';

    export let posts: IPostSnippet[];
</script>

{#each posts as post}
    <PostSnippet
        title={post.title}
        description={post.description}
        id={post.id}
        cover={post.cover}
    />
{/each}
