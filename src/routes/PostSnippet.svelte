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
