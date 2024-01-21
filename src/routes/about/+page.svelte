<script>
    import GithubIcon from './icons/GithubIcon.svelte';
    import InstagramIcon from './icons/InstagramIcon.svelte';
</script>

<main>
    <article class="personal-info">
        <img src="/images/avatar.jpeg" alt="avatar" />
        <div>
            <h1>Hello, I am Timofey</h1>
            <p class="subtitle">
                Film&nbsp;photographer<br />
                Front-end&nbsp;developer<br />
                Music composer&nbsp;(sometimes)
            </p>
            <section class="links">
                <a
                    class="link"
                    title="instagram"
                    href="https://www.instagram.com/utorbin"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <InstagramIcon />
                </a>
                <a
                    class="link"
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
</main>

<style lang="scss">
    main {
        @include content-wrapper;
        @include sheet;

        margin: indent(4) auto;
    }

    .personal-info {
        display: flex;
        align-items: start;
    }

    h1 {
        @include heading-large;
    }

    img {
        width: 30%;
        margin-right: indent(2);
    }

    .subtitle {
        @include heading-medium;
        line-height: 1.6;
    }

    .links {
        display: flex;
        margin-top: indent(1);
    }

    .link {
        display: block;
        width: 32px;
        height: 32px;
        margin-right: indent(0.5);
    }
</style>
