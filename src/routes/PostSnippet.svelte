<script lang="ts">
    import { PostType, type PostSnippetModel } from '$lib/types/posts';
    import { getContext } from 'svelte';

    let {
        id,
        title,
        description,
        cover,
        type
    }: {
        id: number;
        title: string;
        description?: string | null;
        cover?: PostSnippetModel['cover'];
        type: PostType;
    } = $props();

    const photosUrlPrefix = getContext('photosUrlPrefix');
</script>

<!-- TODO: добавить slug вместо id -->
<article
    class="
        container
        mx-auto w-full
        space-y-4 p-6 align-top
        shadow shadow-zinc-300
        md:w-9/12 xl:w-7/12
        dark:shadow-none dark:bg-zinc-800
    "
>
    {#if cover}
        <img class="w-full object-cover" src="{photosUrlPrefix}/{cover.src}" alt={cover.alt} />
    {/if}
    <h2 class="text-3xl">
        {#if type === PostType.FULL}
            <a href="/post/{id}">{title}</a>
        {:else}
            {title}
        {/if}
    </h2>
    {#if description}
        <p>{description}</p>
    {/if}
</article>
