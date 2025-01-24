<script lang="ts">
    import { blur } from 'svelte/transition';
    import CloseIcon from './icons/CloseIcon.svelte';
    import ThemeButton from './ThemeButton.svelte';

    let { tabs, onclose }: { tabs: Record<string, string>; onclose: () => void } = $props();
</script>

<nav
    transition:blur
    class="
        fixed left-0 top-0 z-20
        h-full w-full
        flex flex-col justify-center gap-14
        backdrop-blur-xl
        bg-white bg-opacity-60
        dark:bg-zinc-900 dark:bg-opacity-90"
>
    {#each Object.entries(tabs) as [tabLink, tabName]}
        <a onclick={onclose} class="mx-auto text-3xl" href={tabLink}>
            {@html tabName}
        </a>
        <button class="absolute right-4 top-4 h-8 w-8" onclick={onclose}>
            <CloseIcon class="fill-current" />
        </button>
        <ThemeButton class="absolute right-4 bottom-4 h-8 w-8" />
    {/each}
</nav>
