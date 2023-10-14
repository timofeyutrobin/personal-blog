<script lang="ts">
    import type { PageData } from './$types';
    import Post from './Post.svelte';

    export let data: PageData;
</script>

<div>
    <Post title={data.title} html={data.html} />
</div>

<style lang="scss">
    div {
        @include content-wrapper;

        margin: indent(4) auto;
    }
</style>
