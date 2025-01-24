<script>
    import GithubIcon from './icons/GithubIcon.svelte';
    import InstagramIcon from './icons/InstagramIcon.svelte';
</script>

<svelte:head>
    <title>Timofey Utrobin</title>
</svelte:head>

<article
    class="
        container
        mx-auto
        mb-8
        flex
        max-w-full
        flex-col
        space-y-4
        p-6
        shadow
        shadow-zinc-300
        sm:my-4
        sm:flex-row
        sm:space-x-4
        md:w-9/12
        xl:w-7/12
        dark:shadow-none
        dark:bg-zinc-800
    "
>
    <img
        class="w-full object-contain object-left-top sm:w-1/3"
        src="/images/avatar.jpeg"
        alt="avatar"
    />
    <div>
        <h1 class="mb-2 text-3xl">Hello, I am&nbsp;Timofey</h1>
        <p class="leading-relaxed">
            Film&nbsp;photographer<br />
            Front-end&nbsp;developer<br />
            Music&nbsp;composer (sometimes)
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
