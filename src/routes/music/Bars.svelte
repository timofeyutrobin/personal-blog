<script lang="ts">
    let { isPlaying }: { isPlaying: boolean } = $props();
</script>

<div class="relative h-[24px] w-[20px] {isPlaying ? 'bars-playing' : 'bars-paused'}">
    <div
        class="bar bar-1 absolute bottom-0 left-0 h-full w-[4px] bg-white shadow-bars shadow-indigo-300"
    ></div>
    <div
        class="bar bar-2 absolute bottom-0 left-[8px] h-full w-[4px] bg-white shadow-bars shadow-indigo-300"
    ></div>
    <div
        class="bar bar-3 absolute bottom-0 left-[16px] h-full w-[4px] bg-white shadow-bars shadow-indigo-300"
    ></div>
</div>

<style>
    @keyframes bar-height {
        0% {
            height: 0px;
        }
        100% {
            height: 100%;
        }
    }

    .bars-playing .bar {
        animation-play-state: running;
    }
    .bars-paused .bar {
        animation-play-state: paused;
    }
    .bar {
        animation-name: bar-height;
        animation-iteration-count: infinite;
        animation-direction: alternate-reverse;
        animation-duration: 0.5s;
        animation-timing-function: linear;
    }

    .bar-1 {
        animation-delay: 0.2s;
    }
    .bar-2 {
        animation-delay: 0.4s;
    }
    .bar-3 {
        animation-delay: 0.3s;
    }
</style>
