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
<article
    class="container mx-auto max-w-full space-y-4 p-6 shadow shadow-neutral-300 md:w-9/12 xl:w-7/12"
>
    {#if cover}
        <img class="h-[500px] w-full object-cover" src={cover.src} alt={cover.alt} />
    {/if}
    <h2 class="text-3xl"><a href="/post/{id}">{title}</a></h2>
    <p>{description}</p>
</article>

<!-- <style lang="scss">
    article {
        margin-bottom: indent(3);
        @include sheet;
    }

    h2 {
        margin-bottom: indent(1);
        @include heading-large;
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
</style> -->
