<script>
	import Tabs from "./Tabs.svelte";
</script>
<header>
    <div>
        <a href="/">Timofey Utrobin</a>
    </div>
    <Tabs/>
</header>

<style lang="scss">
    header {
        position: absolute;
        top: 0;
        left: 0;

        display: flex;

        width: 100%;
        height: 60px;
        padding: 0 20px;

        background-color: $main-background-color;

        border-bottom: 1px solid $border-color;
    }

    div {
        height: 100%;
        margin-left: indent(2);

        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    a {
        font-size: 2rem;
    }
</style>
