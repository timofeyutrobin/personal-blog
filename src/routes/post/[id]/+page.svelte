<script lang="ts">
    let { data } = $props();
</script>

<svelte:head>
    <title>{data.title}</title>
</svelte:head>

<article
    class="
        container
        mx-auto max-w-full p-6
        shadow shadow-zinc-300
        sm:my-4 md:w-9/12 xl:w-7/12
        dark:shadow-none dark:bg-zinc-800
    "
>
    <h1 class="mb-4 text-3xl">{data.title}</h1>
    <section class="space-y-4 [&>img]:mx-auto [&>img]:w-4/5">
        {@html data.html}
    </section>
</article>

<style>
    section :global(h1) {
        @apply mb-2 text-2xl font-bold;
    }

    section :global(h2) {
        @apply mb-2 text-xl font-semibold;
    }

    section :global(h3) {
        @apply mb-2 text-lg font-semibold;
    }

    section :global(img) {
        display: block;
        max-width: 100%;
        height: auto;
        margin: 1rem 0;
    }

    section :global(p) {
        @apply my-4;
    }

    section :global(ol) {
        @apply list-decimal;
    }

    section :global(li) {
        @apply list-item ml-4 mt-4;
    }

    section :global(a) {
        @apply text-indigo-500 hover:text-indigo-600 focus:text-indigo-600 active:text-indigo-600;
    }
</style>
