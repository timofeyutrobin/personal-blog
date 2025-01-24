<script lang="ts">
    import ThemeIcon from './icons/ThemeIcon.svelte';
    let { class: className }: { class?: string } = $props();
</script>

<button class={className} onclick={() => document.documentElement.classList.toggle('dark')}>
    <ThemeIcon class="fill-current" />
</button>
