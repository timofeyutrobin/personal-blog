<script lang="ts">
    import { throttle } from 'throttle-debounce';
    import TabsSide from './TabsSide.svelte';
    let { open, onclose }: { open: boolean; onclose: () => void } = $props();

    const tabs: Record<string, string> = {
        '/': 'Photos',
        '/music': 'Music',
        '/about': 'About&nbsp;me'
    };

    let isMobile = $state<boolean | null>(null);
    const onresize = throttle(100, () => {
        isMobile = document.body.clientWidth < parseInt(tailwindConfig.theme.screens.sm);
    });
    $effect(onresize);
</script>

<svelte:window {onresize} />

{#if isMobile && open}
    <TabsSide {tabs} {onclose} />
{:else if isMobile === false}
    <nav class="flex h-auto w-auto flex-row gap-4">
        {#each Object.entries(tabs) as [tabLink, tabName]}
            <a
                class="mx-auto text-3xl text-neutral-800 sm:m-0 sm:text-xl sm:text-current"
                href={tabLink}
            >
                {@html tabName}
            </a>
        {/each}
    </nav>
{/if}
