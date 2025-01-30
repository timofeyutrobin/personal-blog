<script lang="ts">
    import { getContext } from 'svelte';
    import ThemeIcon from './icons/ThemeIcon.svelte';
    let { class: className }: { class?: string } = $props();

    let onclick = getContext<() => void>('toggleDarkTheme');
</script>

<button class={className} {onclick}>
    <ThemeIcon class="fill-current" />
</button>
