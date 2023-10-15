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
        about: 'About me'
    };
</script>

<nav>
    {#each Object.values(Tab) as tab}
        <a href={tabLinks[tab]}>
            {tabNames[tab]}
        </a>
    {/each}
</nav>

<style lang="scss">
    nav {
        display: flex;
        padding: 0 indent(3);
    }

    a {
        position: relative;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;

        font-size: 1.3rem;
        padding: 0 indent(1);
    }
</style>
