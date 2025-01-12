<script lang="ts">
    enum Tab {
        PHOTOS = 'photos',
        MUSIC = 'music',
        ABOUT = 'about'
    }
    const tabLinks: Record<Tab, string> = {
        photos: '/',
        music: '/music',
        about: '/about'
    };
    const tabNames: Record<Tab, string> = {
        photos: 'Photos',
        music: 'Music',
        about: 'About&nbsp;me'
    };
</script>

<nav class="flex space-x-3">
    {#each Object.values(Tab) as tab}
        <a class="text-xl" href={tabLinks[tab]}>
            {@html tabNames[tab]}
        </a>
    {/each}
</nav>

<style land="postcss"></style>
