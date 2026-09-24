<script>
    import { PUBLIC_SITE_IMAGES_BASE_URL } from '$env/static/public';
    import GithubIcon from './icons/GithubIcon.svelte';
    import InstagramIcon from './icons/InstagramIcon.svelte';
</script>

<svelte:head>
    <title>Тимофей Утробин</title>
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
        class="w-58 h-68 object-cover"
        src="{PUBLIC_SITE_IMAGES_BASE_URL}/avatar.webp"
        alt="avatar"
    />
    <div>
        <h1 class="mb-2 text-3xl">Привет! Меня зовут Тимофей</h1>
        <p class="leading-relaxed">
            Фотографирую на пленку и на цифру<br />
            Разработчик<br />
            Пишу музыку (редко)
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
