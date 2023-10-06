<script lang="ts">
	import type { IPost } from '$lib/mocks/snippet';
	import Post from './Post.svelte';

    export let data: IPost;
</script>

<div>
    <Post post={data}/>
</div>

<style>
    div {
        width: 80%;
        max-width: 1440px;
        margin: 0 auto;
    }
</style>
