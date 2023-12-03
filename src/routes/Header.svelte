<script>
    import Tabs from './Tabs.svelte';
</script>

<header>
    <div>
        <a tabindex="-1" href="/">Timofey&nbsp;Utrobin</a>
        <Tabs />
    </div>
</header>

<style lang="scss">
    header {
        position: absolute;
        top: 0;
        left: 0;

        display: flex;

        width: 100%;
        height: 60px;
        padding: 0 indent(3);

        background-color: $header-background-color;
    }

    div {
        margin: auto indent(2);

        display: flex;
        align-items: baseline;
    }

    a {
        font-size: 2rem;
        &:hover,
        &:focus {
            color: inherit;
            outline: none;
        }
    }

    @include mobile {
        div {
            margin: auto 0;
        }
    }
</style>
