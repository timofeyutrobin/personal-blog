<script lang="ts">
    import { page } from '$app/state';
</script>

<main
    class="fixed top-0 left-0 h-full w-full flex flex-col justify-center text-zinc-900 bg-white dark:text-zinc-200 dark:bg-zinc-900"
>
    <h1 class="self-center text-7xl sm:text-9xl mb-4">{page.status}</h1>
    <i class="self-center text-5xl sm:text-7xl not-italic">{page.error?.message}</i>
    {#if page.status === 404}
        <a
            class="
                self-center
                mt-6 sm:mt-8 p-4
                text-xl sm:text-2xl
                border-2 border-zinc-900 dark:border-zinc-200
                hover:bg-zinc-900 focus:bg-zinc-900 dark:hover:bg-zinc-200 dark:focus:bg-zinc-200
                hover:text-white focus:text-white dark:hover:text-zinc-900 dark:focus:tezt-zinc-900
            "
            href="/"
        >
            Go to home page
        </a>
    {/if}
</main>
