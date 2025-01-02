<script lang="ts">
    import type { Image } from '$lib/types/common';

    let {
        id,
        title,
        description,
        cover
    }: { id: string; title: string; description: string; cover?: Image | null } = $props();
</script>

<!-- TODO: добавить slug вместо id -->
<article>
    <h2><a href="/post/{id}">{title}</a></h2>
    {#if cover}
        <img src={cover.src} alt={cover.alt} />
    {/if}
    <p>{description}</p>
</article>

<style lang="scss">
    article {
        @include sheet;

        margin-bottom: indent(3);
    }

    h2 {
        @include heading-large;
        margin-bottom: indent(1);
    }

    p {
        font-size: 1.2rem;
        margin-top: indent(1);
    }

    img {
        width: 100%;
        height: 500px;
        object-fit: contain;
        object-position: left top;
    }

    @include mobile {
        img {
            height: auto;
        }
        article {
            margin-bottom: indent(5);
        }
    }
</style>
