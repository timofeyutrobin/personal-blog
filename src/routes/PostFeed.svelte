<script lang="ts">
    import type { IPostSnippet } from '$lib/server/database/controllers/postController';
    import PostSnippet from './PostSnippet.svelte';

    export let posts: IPostSnippet[];
</script>

<ul>
    {#each posts as post}
        <li>
            <PostSnippet
                title={post.title}
                description={post.description}
                id={post.id}
                cover={post.cover}
            />
        </li>
    {/each}
</ul>

<style lang="scss">
    li {
        margin-bottom: indent(3);
    }
</style>
