<script lang="ts">
	import type { IPostSnippet } from '$lib/mocks/snippet';
	import PostSnippet from './PostSnippet.svelte';

    export let posts: IPostSnippet[];
</script>

<ul>
    {#each posts as post}
        <li>
            <PostSnippet {...post}/>
        </li>
    {/each}
</ul>

<style>
    li {
        margin-bottom: 16px;
    }
</style>
