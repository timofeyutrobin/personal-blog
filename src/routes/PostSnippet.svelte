<script lang="ts">
	import type { Image } from '$lib/types/common';

    export let id: string;
    export let title: string;
    export let description: string;
    export let image: Image | undefined = undefined;
</script>

<article>
    <h2><a href="/post/{id}">{title}</a></h2>
    <p>{description}</p>
    {#if image}
        <img src={image.link} alt={image.alt}/>
    {/if}
</article>

<style lang="scss">
    article {
        position: relative;

        padding: indent(3);
        background-color: $main-background-color;
    }

    h2 {
        font-size: 2rem;
        margin-bottom: indent(1);
    }

    p {
        margin-bottom: indent(1);
    }

    img {
        width: 70%;
    }
</style>
