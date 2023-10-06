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

<style lang="scss">
    li {
        margin-bottom: indent(2);
    }
</style>
