<script lang="ts">
    let { isPlaying }: { isPlaying: boolean } = $props();
</script>

<div class="bars-container {isPlaying ? 'bars-playing' : 'bars-paused'}">
    <div class="bar bar-1"></div>
    <div class="bar bar-2"></div>
    <div class="bar bar-3"></div>
</div>

<style lang="scss">
    @keyframes bar-height {
        0% {
            height: 0px;
        }
        100% {
            height: 100%;
        }
    }

    .bars-container {
        position: relative;
        height: 24px;
        width: 20px;
    }

    .bars-playing {
        .bar {
            animation-play-state: running;
        }
    }
    .bars-paused {
        .bar {
            animation-play-state: paused;
        }
    }
    .bar {
        position: absolute;
        bottom: 0;

        width: 4px;
        height: 100%;
        background-color: $main-background-color;
        box-shadow: 0 0 4px $link-hover-color;
        border-radius: 4px;
        animation-name: bar-height;
        animation-iteration-count: infinite;
        animation-direction: alternate-reverse;
        animation-duration: 0.5s;
        animation-timing-function: linear;
    }

    .bar-1 {
        left: 0;
        animation-delay: 0.2s;
    }
    .bar-2 {
        left: 8px;
        animation-delay: 0.4s;
    }
    .bar-3 {
        left: 16px;
        animation-delay: 0.3s;
    }
</style>
