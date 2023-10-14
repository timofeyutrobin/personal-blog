<script lang="ts">
    export let title: string;
    export let html: string;
</script>

<article>
    <h1>{title}</h1>
    <section>
        {@html html}
    </section>
</article>

<style lang="scss">
    article {
        padding: indent(3);
        background-color: $main-background-color;
        @include default-box-shadow;
    }
    h1 {
        font-size: 2rem;
        margin-bottom: indent(1);
    }
    section > :global(p) {
        margin-bottom: indent(3);
    }

    section > :global(img) {
        display: block;
        width: 80%;
        margin: indent(2) auto;
    }
</style>
