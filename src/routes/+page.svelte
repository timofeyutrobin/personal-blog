<script lang="ts">
    import PostSnippet from './PostSnippet.svelte';

    let { data } = $props();
</script>

<svelte:head>
    <title>Тимофей Утробин - блог</title>
</svelte:head>

<main class="mb-8 space-y-6 sm:my-4">
    {#each data.posts as { id, type, cover, title, description, created } (id)}
        {#if id}
            <PostSnippet {id} {type} {cover} {title} {description} {created} />
        {/if}
    {:else}
        <p class="w-full text-center mt-32 text-lg text-zinc-500">Тут ничего нет</p>
    {/each}
</main>
