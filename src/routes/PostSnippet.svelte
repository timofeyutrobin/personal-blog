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
        padding: 24px;
        background-color: #eee;
    }

    h2 {
        font-size: 2rem;
    }

    p {
        margin: 24px 0;
    }

    img {
        width: 70%;
    }
</style>
