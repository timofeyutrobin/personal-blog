<script lang="ts">
    let { data } = $props();
</script>

<svelte:head>
    <title>{data.title}</title>
</svelte:head>

<article
    class="container mx-auto max-w-full p-6 shadow shadow-neutral-300 sm:my-4 md:w-9/12 xl:w-7/12"
>
    <h1 class="mb-4 text-3xl">{data.title}</h1>
    <section class="space-y-4 [&>img]:mx-auto [&>img]:w-4/5">
        {@html data.html}
    </section>
</article>
