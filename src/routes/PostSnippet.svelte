<script lang="ts">
    import { PUBLIC_PHOTOS_BASE_URL } from '$env/static/public';
    import { type PostModel, PostType } from '$lib/types/posts';

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
        cover?: PostModel['cover'];
        type: PostType;
    } = $props();
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
        <img
            class="w-full object-cover"
            src="{PUBLIC_PHOTOS_BASE_URL}/{cover.src}"
            alt={cover.alt}
        />
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
