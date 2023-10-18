<script lang="ts">
    import type { PageData } from './$types';
    import PostFeed from './PostFeed.svelte';

    export let data: PageData;
</script>

<svelte:head>
    <title>Timofey Utrobin</title>
</svelte:head>

<main>
    <PostFeed posts={data.posts} />
</main>

<style lang="scss">
    main {
        @include content-wrapper;
        margin: indent(4) auto;
    }
</style>
