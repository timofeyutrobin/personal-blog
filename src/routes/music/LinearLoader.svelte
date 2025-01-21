<script lang="ts">
    let { class: className }: { class: string } = $props();
</script>

<div
    class="{className} progress h-1 w-full bg-gradient-to-r from-transparent via-indigo-600 to-transparent"
></div>

<style type="postcss">
    @keyframes load {
        0% {
            @apply opacity-0;
        }
        100% {
            @apply opacity-100;
        }
    }

    .progress {
        animation-name: load;
        animation-iteration-count: infinite;
        animation-direction: alternate-reverse;
        animation-duration: 1s;
        animation-timing-function: ease-in-out;
    }
</style>
