<script lang="ts">
	import Header from './Header.svelte';
</script>

<Header/>
<main>
    <slot/>
</main>

<style>
    main {
        position: absolute;
        top: 60px;
    }
</style>
