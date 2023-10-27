<script lang="ts">
    import WaveSurfer from 'wavesurfer.js';
    import throttle from 'just-throttle';
    import { onMount } from 'svelte';
    import Track from './Track.svelte';
    import UnmuteIcon from './UnmuteIcon.svelte';
    import MuteIcon from './MuteIcon.svelte';
    import Slider from '@smui/slider';

    const tracks = {
        interference: {
            src: '/music/interference.mp3',
            title: 'Вмешательство',
            cover: '/images/covers/interference_cover.jpeg',
            duration: '6:18'
        },
        ii: {
            src: '/music/II.mp3',
            title: 'II',
            cover: '/images/covers/ii_cover.jpeg',
            duration: '4:35'
        },
        radioDream: {
            src: '/music/radiodream.mp3',
            title: 'Радиомечта',
            cover: '/images/covers/radiodream_cover.jpeg',
            duration: '7:53'
        }
    };
    type Tracks = typeof tracks;
    const trackList = Object.keys(tracks) as (keyof Tracks)[];

    const audioContext = new AudioContext();
    const gainNode = audioContext.createGain();

    gainNode.connect(audioContext.destination);

    let audioElement: HTMLMediaElement | null = null;
    let audioSource: MediaElementAudioSourceNode | null = null;
    let currentTrackId: keyof Tracks | null = null;
    let currentTrackIndex: number = -1;

    let currentTime: number;

    let isPaused: boolean = true;
    let isMusicOpen: boolean = false;
    let isMuted: boolean = false;
    $: isMuted = gainNode.gain.value === 0;

    let volumeBeforeMute = gainNode.gain.value;

    let waveforms: Record<keyof Tracks, WaveSurfer | null> = {
        ii: null,
        interference: null,
        radioDream: null
    };
    let waveformsLoading: Record<keyof Tracks, boolean> = {
        ii: false,
        interference: false,
        radioDream: false
    };

    async function playNewTrack(trackId: keyof Tracks): Promise<void> {
        audioElement = document.querySelector<HTMLMediaElement>(`#audio-${trackId}`);

        if (!audioElement) {
            throw new Error(`No track with id: ${trackId}.`);
        }

        audioSource = audioContext.createMediaElementSource(audioElement);
        audioSource.connect(gainNode);

        await audioElement.play();

        currentTrackId = trackId;
        currentTrackIndex = trackList.findIndex((id) => currentTrackId === id);
        waveforms[currentTrackId]?.toggleInteraction(true);
    }

    async function stopCurrentTrack(): Promise<void> {
        if (!currentTrackId || !audioSource || !audioElement) {
            return;
        }
        currentTime = 0;
        waveforms[currentTrackId]?.toggleInteraction(false);
        audioSource.disconnect(gainNode);
        audioElement.pause();
        audioElement.fastSeek(0);
    }

    function pauseCurrentTrack(): void {
        audioElement!.pause();
    }

    async function resumeCurrentTrack(): Promise<void> {
        return audioElement!.play();
    }

    async function handlePlayClick(trackId: keyof Tracks): Promise<void> {
        if (!isMusicOpen) {
            isMusicOpen = true;
        }

        if (trackId !== currentTrackId) {
            stopCurrentTrack();
            await playNewTrack(trackId);
        } else {
            if (isPaused) {
                await resumeCurrentTrack();
            } else {
                pauseCurrentTrack();
            }
        }

        isPaused = audioElement!.paused;
    }

    async function handleTrackEnd(): Promise<void> {
        stopCurrentTrack();
        const newTrackIndex = currentTrackIndex + 1 < trackList.length ? currentTrackIndex + 1 : 0;
        const nextTrackId = trackList[newTrackIndex];

        return playNewTrack(nextTrackId);
    }

    const handleTimeUpdate = throttle((event: Event) => {
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
            waveform.on('loading', () => {
                waveformsLoading[trackId] = true;
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
        <Slider
            class="volume-slider"
            step={0.05}
            min={0}
            max={1}
            bind:value={gainNode.gain.value}
        />
        <button
            class="mute-button"
            on:click={() => {
                if (isMuted) {
                    gainNode.gain.value = volumeBeforeMute;
                } else {
                    volumeBeforeMute = gainNode.gain.value;
                    gainNode.gain.value = 0;
                }
            }}
        >
            {#if isMuted}
                <UnmuteIcon />
            {:else}
                <MuteIcon />
            {/if}
        </button>
    </div>
    <div class="track-list">
        {#each trackList as trackId}
            <audio
                id={`audio-${trackId}`}
                src={tracks[trackId].src}
                on:ended={handleTrackEnd}
                on:timeupdate={handleTimeUpdate}
            />
            <Track
                id={trackId}
                title={tracks[trackId].title}
                cover={tracks[trackId].cover}
                isCurrent={trackId === currentTrackId}
                {isMusicOpen}
                isWaveformLoading={waveformsLoading[trackId]}
                {isPaused}
                {handlePlayClick}
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
        width: 32px;
        height: 32px;
        padding: 4px;
        border-radius: 50%;

        @include transition(background-color);

        cursor: pointer;

        &:hover,
        &:focus,
        &:active {
            background-color: $hover-background-color;
        }
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
