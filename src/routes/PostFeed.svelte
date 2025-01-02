<script lang="ts">
    import type { IPostSnippet } from '$lib/server/database/controllers/postController';
    import PostSnippet from './PostSnippet.svelte';

    let { posts }: { posts: IPostSnippet[] } = $props();
</script>

{#each posts as post}
    <PostSnippet {...post} />
{/each}
