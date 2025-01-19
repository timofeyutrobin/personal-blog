<script lang="ts">
    import Tabs from './Tabs.svelte';
    import MenuIcon from './icons/MenuIcon.svelte';

    let isTabsOpen = $state(false);
    const closeTabs = () => {
        isTabsOpen = false;
    };
</script>

<header class="my-auto flex w-full items-baseline gap-4 px-6 py-4 sm:gap-6">
    <button onclick={() => (isTabsOpen = true)} class="h-8 w-8 shrink-0 self-center p-1 sm:hidden">
        <MenuIcon />
    </button>
    <a class="text-3xl" tabindex="-1" href="/">Timofey&nbsp;Utrobin</a>
    <Tabs open={isTabsOpen} onclose={closeTabs} />
</header>

<svelte:window
    onresize={() => {
        if (isTabsOpen) {
            closeTabs();
        }
    }}
/>
