<script lang="ts">
    import type { Data } from './+page.server';
	import PostFeed from './PostFeed.svelte';

    export let data: Data;
</script>

<div>
    <PostFeed posts={data.posts}/>
</div>

<style lang="scss">
    div {
        width: 60%;
        margin: indent(2) auto;
    }
</style>
