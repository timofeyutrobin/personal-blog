<script lang="ts">
    import WaveSurfer from 'wavesurfer.js';
    import throttle from 'just-throttle';
    import { onMount } from 'svelte';
    import Track from './Track.svelte';
    import UnmuteIcon from './icons/UnmuteIcon.svelte';
    import MuteIcon from './icons/MuteIcon.svelte';
    import Slider from '@smui/slider';
    import { tracks, type TrackId } from './tracks';

    const trackList = Object.keys(tracks) as TrackId[];

    const audioContext = new AudioContext();
    const gainNode = audioContext.createGain();
    gainNode.connect(audioContext.destination);
    let volume = $state(gainNode.gain.value);
    $effect(() => {
        gainNode.gain.value = volume;
    });

    let audioElement = $state<HTMLMediaElement | null>(null);
    let audioSource = $state<MediaElementAudioSourceNode | null>(null);

    let currentTrackId = $state<TrackId | null>(null);
    let currentTrackIndex = $derived(currentTrackId ? tracks[currentTrackId].index : 0);

    let currentTime = $state(0);

    let isPaused = $state(true);
    let isMuted = $derived(volume === 0);

    let volumeBeforeMute = $state(gainNode.gain.value);

    const waveforms: Record<TrackId, WaveSurfer | null> = {
        ii: null,
        interference: null,
        radioDream: null
    };
    const waveformsLoading: Record<TrackId, boolean> = $state({
        ii: true,
        interference: true,
        radioDream: true
    });

    async function playNew(trackId: TrackId): Promise<void> {
        audioElement = document.querySelector<HTMLMediaElement>(`#audio-${trackId}`);

        if (!audioElement) {
            throw new Error(`No track with id: ${trackId}.`);
        }

        audioSource = audioContext.createMediaElementSource(audioElement);
        audioSource.connect(gainNode);

        await audioElement.play();

        currentTrackId = trackId;
        waveforms[currentTrackId]?.toggleInteraction(true);
    }

    async function stop(): Promise<void> {
        if (!currentTrackId || !audioSource || !audioElement) {
            return;
        }
        currentTime = 0;
        waveforms[currentTrackId]?.toggleInteraction(false);
        audioSource.disconnect(gainNode);
        audioElement.pause();
        audioElement.fastSeek(0);
    }

    function pause(): void {
        audioElement!.pause();
    }

    async function resume(): Promise<void> {
        return audioElement!.play();
    }

    async function onplay(trackId: TrackId): Promise<void> {
        if (trackId !== currentTrackId) {
            stop();
            await playNew(trackId);
        } else {
            if (isPaused) {
                await resume();
            } else {
                pause();
            }
        }

        isPaused = audioElement!.paused;
    }

    async function onended(): Promise<void> {
        stop();
        const nextTrackIndex = currentTrackIndex + 1 < trackList.length ? currentTrackIndex + 1 : 0;
        const nextTrackId = trackList[nextTrackIndex];

        return playNew(nextTrackId);
    }

    const ontimeupdate = throttle((event: Event) => {
        currentTime = (event.target as HTMLAudioElement).currentTime;
    }, 1000);

    onMount(() => {
        trackList.forEach((trackId) => {
            const waveform = WaveSurfer.create({
                container: `#waveform-${trackId}`,
                waveColor: '#8663de',
                progressColor: '#383351',
                media: document.querySelector<HTMLMediaElement>(`#audio-${trackId}`)!,
                barWidth: 4,
                height: 'auto',
                normalize: true,
                barRadius: 2,
                barAlign: 'bottom',
                barHeight: 10,
                cursorWidth: 4,
                dragToSeek: true,
                interact: false
            });
            waveform.on('ready', () => {
                waveformsLoading[trackId] = false;
            });

            waveforms[trackId] = waveform;
        });
    });
</script>

<main>
    <h1>My music</h1>
    <div class="controls">
        <button
            class="mute-button"
            onclick={() => {
                if (isMuted) {
                    volume = volumeBeforeMute;
                } else {
                    volumeBeforeMute = volume;
                    volume = 0;
                }
            }}
        >
            {#if isMuted}
                <UnmuteIcon />
            {:else}
                <MuteIcon />
            {/if}
        </button>
        <Slider class="volume-slider" step={0.05} min={0} max={1} bind:value={volume} />
    </div>
    <div class="track-list">
        {#each trackList as trackId}
            <audio id="audio-{trackId}" src={tracks[trackId].src} {onended} {ontimeupdate}></audio>
            <Track
                id={trackId}
                title={tracks[trackId].title}
                cover={tracks[trackId].cover}
                isCurrent={trackId === currentTrackId}
                isWaveformLoading={waveformsLoading[trackId]}
                {isPaused}
                {onplay}
                totalTime={tracks[trackId].duration}
                currentTimeSec={currentTime}
            />
        {/each}
    </div>
</main>

<style lang="scss">
    main {
        position: relative;
        @include content-wrapper;
        @include sheet;

        margin: indent(4) auto;
    }

    h1 {
        @include heading-large;
    }

    .mute-button {
        @include button(32px, 32px);
    }

    .track-list {
        margin-top: indent(2);
    }

    .controls {
        position: absolute;
        top: indent(3);
        right: indent(3);
        display: flex;
        align-items: center;
    }

    :global(.volume-slider) {
        width: 150px;
    }
</style>
