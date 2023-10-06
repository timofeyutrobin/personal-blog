<script>
	import Tabs from "./Tabs.svelte";
</script>
<header>
    <div>
        <a href="/">Timofey Utrobin</a>
    </div>
    <Tabs/>
</header>

<style>
    header {
        position: fixed;
        top: 0;
        left: 0;

        display: flex;

        width: 100%;
        height: 60px;
        padding: 0 20px;

        background-color: #eee;
    }

    div {
        height: 100%;
        margin-left: 16px;

        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    a {
        font-size: 2rem;
    }
</style>
