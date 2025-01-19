<script lang="ts">
    import PostFeed from './PostFeed.svelte';

    let { data } = $props();
</script>

<svelte:head>
    <title>Timofey Utrobin - posts</title>
</svelte:head>

<main class="mb-8 space-y-6 sm:my-4">
    <PostFeed posts={data.posts} />
</main>
