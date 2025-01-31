<script lang="ts">
    import type { PostSnippetModel } from '$lib/types/posts';
    import PostSnippet from './PostSnippet.svelte';

    let { posts }: { posts: PostSnippetModel[] } = $props();
</script>

{#each posts as post}
    <PostSnippet {...post} />
{/each}
