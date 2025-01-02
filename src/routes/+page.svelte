<script lang="ts">
    import PostFeed from './PostFeed.svelte';

    let { data } = $props();
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
