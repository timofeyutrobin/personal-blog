<script lang="ts">
    import type { Data } from './+page.server';
	import PostFeed from './PostFeed.svelte';

    export let data: Data;
</script>

<main>
    <PostFeed posts={data.posts}/>
</main>

<style>
    main {
        width: 60%;
        margin: auto;
        padding: 16px 0;
    }
</style>
