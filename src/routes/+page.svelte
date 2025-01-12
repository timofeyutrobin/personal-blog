<script lang="ts">
    import PostFeed from './PostFeed.svelte';

    let { data } = $props();
</script>

<svelte:head>
    <title>Timofey Utrobin - posts</title>
</svelte:head>

<main class="my-8 space-y-6">
    <PostFeed posts={data.posts} />
</main>
