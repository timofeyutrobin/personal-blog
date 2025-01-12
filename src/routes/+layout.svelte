<script lang="ts">
    import '../app.css';
    import Header from './Header.svelte';
</script>

<Header />
<div class="absolute top-16 w-full">
    <slot />
</div>

<style lang="postcss"></style>
