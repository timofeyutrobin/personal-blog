<script lang="ts">
    import '../app.scss';
    import Header from './Header.svelte';
</script>

<Header />
<div>
    <slot />
</div>

<style lang="scss">
    div {
        position: absolute;
        top: 60px;
        width: 100%;
    }
</style>
