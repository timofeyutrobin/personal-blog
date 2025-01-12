<script>
    import GithubIcon from './icons/GithubIcon.svelte';
    import InstagramIcon from './icons/InstagramIcon.svelte';
</script>

<svelte:head>
    <title>Timofey Utrobin</title>
</svelte:head>

<article
    class="container mx-auto my-8 flex max-w-full space-x-4 p-6 shadow shadow-neutral-300 md:w-9/12 xl:w-7/12"
>
    <img class="w-1/3 object-cover" src="/images/avatar.jpeg" alt="avatar" />
    <div>
        <h1 class="mb-2 text-3xl">Hello, I am Timofey</h1>
        <p class="text-lg leading-relaxed">
            Film&nbsp;photographer<br />
            Front-end&nbsp;developer<br />
            Music composer&nbsp;(sometimes)
        </p>
        <section class="mt-2 flex space-x-1">
            <a
                class="size-8"
                title="instagram"
                href="https://www.instagram.com/utorbin"
                target="_blank"
                rel="noopener noreferrer"
            >
                <InstagramIcon />
            </a>
            <a
                class="size-8"
                title="github"
                href="https://github.com/timofeyutrobin"
                target="_blank"
                rel="noopener noreferrer"
            >
                <GithubIcon />
            </a>
        </section>
    </div>
</article>
