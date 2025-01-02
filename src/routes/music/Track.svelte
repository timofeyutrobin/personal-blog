<script lang="ts" generics="T extends string">
    import PauseIcon from './icons/PauseIcon.svelte';
    import PlayIcon from './icons/PlayIcon.svelte';
    import Progress from '@smui/linear-progress';
    import Bars from './Bars.svelte';

    interface Props {
        id: T;
        title: string;
        cover: string;
        currentTimeSec: number | undefined;
        totalTime: string;
        isCurrent: boolean;
        isPaused: boolean;
        isWaveformLoading: boolean;
        onplay: (id: T) => Promise<void>;
    }
    let {
        id,
        title,
        cover,
        currentTimeSec,
        totalTime,
        isCurrent,
        isPaused,
        isWaveformLoading,
        onplay
    }: Props = $props();

    const currentTimeDisplay = $derived.by(() => {
        if (!currentTimeSec || !isCurrent) {
            return '0:00';
        } else {
            const minutes = Math.floor(currentTimeSec / 60);
            const seconds = Math.floor(currentTimeSec) % 60;
            return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        }
    });
</script>

<div class="track">
    <div class="cover" style="background-image: url({cover})">
        {#if isCurrent}
            <div class="bars">
                <Bars isPlaying={!isPaused} />
            </div>
        {/if}
        <button
            onclick={() => onplay(id)}
            class="play-button {isCurrent ? 'current' : ''}"
            disabled={isWaveformLoading}
        >
            {#if (isCurrent && isPaused) || !isCurrent}
                <PlayIcon />
            {:else}
                <PauseIcon />
            {/if}
        </button>
    </div>
    <div class="track-main-section">
        <h2 class="title">{title}</h2>
        <div class="waveform" id="waveform-{id}"></div>
        {#if isWaveformLoading}
            <div class="waveform-loader-container">
                <Progress class="waveform-loader" indeterminate />
            </div>
        {/if}
        <div class="time">
            <span class="current-time">{currentTimeDisplay}</span>
            <span class="total-time">{totalTime}</span>
        </div>
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

    .bars {
        position: absolute;
        bottom: indent(1);
        left: indent(1);
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
        position: relative;
        display: flex;
        align-items: center;

        padding: indent(2) 0;

        @include transition(background-color);
    }

    .track-main-section {
        margin-left: indent(2);
    }

    .title {
        @include heading-medium;
    }

    $waveform-height: 32px;
    $waveform-width: 300px;

    .waveform {
        margin-top: indent(2);
        height: $waveform-height;
        width: $waveform-width;
        cursor: pointer;
    }

    .waveform-loader-container {
        margin-top: -$waveform-height;
        height: $waveform-height;
        width: $waveform-width;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }

    .waveform-loader {
        width: 100%;
    }

    .time {
        width: $waveform-width;
        display: flex;
        justify-content: space-between;
        font-size: 0.85rem;
    }
</style>
