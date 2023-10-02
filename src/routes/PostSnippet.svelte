<script lang="ts">
	import type { Image } from '$lib/types/common';

    export let title: string;
    export let description: string;
    export let link: string;
    export let image: Image | undefined = undefined;
</script>

<article>
    <h2><a href={link}>{title}</a></h2>
    <p>{description}</p>
    {#if image}
        <img src={image.link} alt={image.alt} width="500"/>
    {/if}
</article>

<style>
    article {
        padding: 24px;
        background-color: #eee;
    }

    h2 {
        font-size: 2rem;
    }

    p {
        margin: 24px 0;
    }
</style>
