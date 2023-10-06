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
    h1 {
        font-size: 2rem;
        margin: 16px 0;
    }
    section > :global(p) {
        margin-bottom: 24px;
    }

    section > :global(img) {
        display: block;
        width: 80%;
        margin: 16px auto;
    }
</style>
