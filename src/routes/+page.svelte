<script lang="ts">
    import type { Data } from './+page.server';
	import PostSnippet from './PostSnippet.svelte';
    export let data: Data;
</script>

<main>
    <ul>
        {#each data.posts as post}
            <li>
                <PostSnippet {...post}/>
            </li>
        {/each}
    </ul>
</main>

<style>
    main {
        padding: 16px 0;
    }

    ul {
        width: 60vw;
        margin: auto;
    }

    li {
        margin-bottom: 16px;
    }
</style>
