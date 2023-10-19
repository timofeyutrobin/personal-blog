<script lang="ts" generics="T extends string">
    export let id: T;
    export let title: string;
    export let cover: string;

    export let isCurrent: boolean;
    export let isPaused: boolean;
    export let isMusicOpen: boolean;
    export let isWaveformLoading: boolean;

    export let handlePlayClick: (id: T) => Promise<void>;

    import PauseIcon from './PauseIcon.svelte';
    import PlayIcon from './PlayIcon.svelte';
</script>

<div class="track">
    <div class="cover" style={`background-image: url(${cover})`}>
        <button
            on:click={() => handlePlayClick(id)}
            class={`play-button ${isCurrent ? 'current' : ''}`}
        >
            {#if (isCurrent && isPaused) || !isMusicOpen || !isCurrent}
                <PlayIcon />
            {:else}
                <PauseIcon />
            {/if}
        </button>
    </div>
    <div class="track-main-section">
        <h2 class="title">{title}</h2>
        <div class="waveform" id={`waveform-${id}`} />
        {#if isWaveformLoading}
            <div class={`waveform-loader waveform-loader-loading`}>Loading...</div>
        {/if}
    </div>
</div>

<style lang="scss">
    @mixin active-button {
        @include default-box-shadow($shadow-alt-color);
        :global(svg) {
            color: $shadow-alt-color;
        }
    }

    .cover {
        position: relative;
        width: 200px;
        height: 200px;
        background-size: cover;
    }

    .play-button {
        position: absolute;
        bottom: indent(1);
        right: indent(1);
        cursor: pointer;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        background-color: $main-background-color;
        @include default-box-shadow;
        @include transition(box-shadow);
        display: flex;

        &.current {
            @include active-button;
        }

        :global(svg) {
            width: 36px;
            height: 36px;
            margin: auto;
            @include transition(color);
        }

        &:hover,
        &:focus,
        &:active {
            @include active-button;
        }
    }

    .track {
        display: flex;
        align-items: center;

        padding: indent(2) 0;

        @include transition(background-color);
    }

    .track-main-section {
        flex-grow: 1;
        margin-left: indent(2);
    }

    .title {
        @include heading-medium;
    }

    .waveform {
        margin-top: indent(2);
        height: 32px;
        width: 300px;
        cursor: pointer;
    }
</style>
