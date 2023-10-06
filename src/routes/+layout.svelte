<script lang="ts">
	import Header from './Header.svelte';
</script>

<Header/>
<div class="content">
    <slot/>
</div>

<style>
    .content {
        margin-top: 60px;
    }
</style>
