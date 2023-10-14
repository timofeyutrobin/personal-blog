<script lang="ts">
    import type { PageData } from './$types';
    import PostFeed from './PostFeed.svelte';

    export let data: PageData;
</script>

<div>
    <PostFeed posts={data.posts} />
</div>

<style lang="scss">
    div {
        @include content-wrapper;
        margin: indent(2) auto;
    }
</style>
