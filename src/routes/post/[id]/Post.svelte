<script lang="ts">
	import type { IPost } from '$lib/mocks/snippet';

    export let post: IPost;
</script>

<article>
    <h1>{post.title}</h1>
    <section>
        {@html post.html}
    </section>
</article>

<style lang="scss">
    article {
        padding: indent(3);
        background-color: $main-background-color;
    }
    h1 {
        font-size: 2rem;
        margin-bottom: indent(1);
    }
    section > :global(p) {
        margin-bottom: indent(3);
    }

    section > :global(img) {
        display: block;
        width: 80%;
        margin: indent(2) auto;
    }
</style>
