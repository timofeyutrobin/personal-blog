<script lang="ts">
    import '../app.css';
    import localStorage from '$lib/localStorage';
    import Header from './Header.svelte';
    import { setContext } from 'svelte';

    let { children } = $props();

    let isDarkTheme = $state(false);
    setContext('toggleDarkTheme', () => (isDarkTheme = !isDarkTheme));

    $effect(() => {
        isDarkTheme = localStorage.getItem('theme') === 'dark';
    });

    $effect(() => {
        localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', isDarkTheme);
    });
</script>

<Header />
{@render children()}
