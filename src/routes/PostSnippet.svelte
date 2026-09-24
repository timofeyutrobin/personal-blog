<script lang="ts">
    import { PUBLIC_PHOTOS_BASE_URL } from '$env/static/public';
    import { PostType } from '$lib/types/posts';

    let {
        id,
        title,
        description,
        cover,
        alt,
        type,
        created
    }: {
        id: string;
        title: string;
        description?: string | null;
        cover?: string;
        alt?: string;
        type: PostType;
        created: string;
    } = $props();

    const dateString = $derived(
        new Date(created).toLocaleDateString(['ru-RU'], {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
    );
</script>

<article
    class="
        container
        mx-auto w-full
        space-y-4 p-6 align-top
        shadow-md shadow-zinc-300
        md:w-9/12 xl:w-7/12
        dark:shadow-none dark:bg-zinc-800
    "
>
    {#if cover}
        <img
            class="max-w-full max-h-[500px] object-cover"
            src="{PUBLIC_PHOTOS_BASE_URL}/{cover}"
            {alt}
        />
    {/if}
    <h2 class="text-3xl">
        {#if type === PostType.FULL}
            <a href="post/{id}">{title}</a>
        {:else}
            {title}
        {/if}
    </h2>
    {#if description}
        <p>{description}</p>
    {/if}
    <time class="text-sm text-zinc-400" datetime={created}>{dateString}</time>
</article>
