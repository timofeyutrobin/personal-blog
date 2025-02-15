<script lang="ts">
    import Tabs from './Tabs.svelte';
    import ThemeButton from './ThemeButton.svelte';
    import MenuIcon from './icons/MenuIcon.svelte';

    let isTabsOpen = $state(false);
    const closeTabs = () => {
        isTabsOpen = false;
    };
</script>

<header class="flex w-full items-baseline gap-4 px-6 py-4 bg-white sm:gap-6 dark:bg-zinc-900">
    <button onclick={() => (isTabsOpen = true)} class="h-8 w-8 shrink-0 self-center p-1 sm:hidden">
        <MenuIcon class="fill-current" />
    </button>
    <a class="text-3xl" tabindex="-1" href="/">Timofey&nbsp;Utrobin</a>
    <Tabs open={isTabsOpen} onclose={closeTabs} />
    <ThemeButton class="h-6 w-6 self-center ml-auto hidden sm:block" />
</header>

<svelte:window
    onresize={() => {
        if (isTabsOpen) {
            closeTabs();
        }
    }}
/>
