<script lang="ts">
	import type { Image } from '$lib/types/common';

    export let id: string;
    export let title: string;
    export let description: string;
    export let image: Image | undefined = undefined;
</script>

<article>
    <h2><a href="/post/{id}">{title}</a></h2>
    {#if image}
        <img src={image.link} alt={image.alt}/>
    {/if}
    <p>{description}</p>
</article>

<style lang="scss">
    article {
        padding: indent(3);
        background-color: $main-background-color;
    }

    h2 {
        font-size: 2rem;
        margin-bottom: indent(1);
    }

    p {
        margin-top: indent(1);
    }

    img {
        width: 100%;
        height: 500px;
        object-fit: contain;
    }
</style>
