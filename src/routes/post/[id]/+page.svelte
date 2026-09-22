<script lang="ts">
    import type { PageProps } from './$types';
    let { params }: PageProps = $props();
</script>

{#await import(`$lib/posts/${params.id}.md`)}
    <p class="w-full text-center mt-32 text-lg text-zinc-500">Loading...</p>
{:then post}
    {@const Post = post.default}
    <article
        class="
            prose prose-zinc prose-img:max-w-175 prose-img:max-h-[70vh]
            container mx-auto max-w-full p-6
            shadow-md shadow-zinc-300
            sm:my-4 md:w-9/12 xl:w-7/12
            dark:shadow-none dark:bg-zinc-800 dark:prose-invert
        "
    >
        <Post />
    </article>
{:catch error}
    <p>error!</p>
{/await}
