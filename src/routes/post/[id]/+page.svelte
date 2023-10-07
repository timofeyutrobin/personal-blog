<script lang="ts">
	import type { IPost } from '$lib/mocks/snippet';
	import Post from './Post.svelte';

    export let data: IPost;
</script>

<div>
    <Post post={data}/>
</div>

<style lang="scss">
    div {
        @include content-wrapper;

        margin: indent(2) auto;
    }
</style>
