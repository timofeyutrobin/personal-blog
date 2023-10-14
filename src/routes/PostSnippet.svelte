<script lang="ts">
	import type { Image } from '$lib/types/common';

    export let id: string;
    export let title: string;
    export let description: string;
    export let cover: Image | null | undefined = undefined;
</script>

<!-- TODO: добавить slug вместо id -->
<article>
    <h2><a href="/post/{id}">{title}</a></h2>
    {#if cover}
        <img src={cover.src} alt={cover.alt}/>
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
        object-position: left top;
    }
</style>
