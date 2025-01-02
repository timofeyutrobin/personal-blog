<script lang="ts">
    import Post from './Post.svelte';

    let { data } = $props();
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
