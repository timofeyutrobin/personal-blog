<script lang="ts">
    import { blur } from 'svelte/transition';
    import CloseIcon from './icons/CloseIcon.svelte';

    let { tabs, onclose }: { tabs: Record<string, string>; onclose: () => void } = $props();
</script>

<nav
    transition:blur
    class="fixed left-0 top-0 z-10 flex h-full w-full flex-col justify-center gap-14 bg-white bg-opacity-60 backdrop-blur-xl"
>
    {#each Object.entries(tabs) as [tabLink, tabName]}
        <a
            onclick={onclose}
            class="mx-auto text-3xl text-neutral-800 sm:m-0 sm:text-xl sm:text-current"
            href={tabLink}
        >
            {@html tabName}
        </a>
        <button class="absolute right-4 top-4 h-8 w-8 sm:hidden" onclick={onclose}>
            <CloseIcon />
        </button>
    {/each}
</nav>
