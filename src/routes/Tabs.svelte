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
    <ul>
        {#each Object.values(Tab) as tab}
            <li>
                <a
                    href={tabLinks[tab]}
                >
                    {tabNames[tab]}
                </a>
            </li>
        {/each}
    </ul>
</nav>

<style>
    nav {
        height: 100%;
    }

    ul {
        height: 100%;
        display: flex;
        padding: 0 24px;
    }

    a {
        position: relative;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;

        font-size: 1.3rem;
        padding: 0 8px;
    }

    a:hover {
        background-color: #ddd;
    }
</style>
