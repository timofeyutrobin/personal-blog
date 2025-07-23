<script lang="ts">
    import type { PostSnippetModel } from '$lib/types/posts';
    import PostSnippet from './PostSnippet.svelte';

    let { posts }: { posts: PostSnippetModel[] } = $props();
</script>

{#each posts as post}
    <PostSnippet
        id={post.id}
        title={post.title}
        type={post.type}
        cover={post.cover}
        description={post.description}
    />
{/each}
