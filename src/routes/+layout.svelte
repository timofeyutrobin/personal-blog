<script lang="ts">
	import "../app.scss";
    import Header from './Header.svelte';
</script>

<Header/>
<main>
    <slot/>
</main>

<style lang="scss">
    main {
        position: absolute;
        top: 60px;
        width: 100%;
    }
</style>
