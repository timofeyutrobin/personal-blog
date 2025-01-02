<script lang="ts">
    import WaveSurfer from 'wavesurfer.js';
    import throttle from 'just-throttle';
    import { onMount } from 'svelte';
    import Track from './Track.svelte';
    import UnmuteIcon from './icons/UnmuteIcon.svelte';
    import MuteIcon from './icons/MuteIcon.svelte';
    import Slider from '@smui/slider';

    // TODO: убрать отсюда
    const tracks = {
        interference: {
            index: 0,
            src: '/music/interference.mp3',
            title: 'Вмешательство',
            cover: '/images/covers/interference_cover.jpeg',
            duration: '6:18'
        },
        ii: {
            index: 1,
            src: '/music/II.mp3',
            title: 'II',
            cover: '/images/covers/ii_cover.jpeg',
            duration: '4:35'
        },
        radioDream: {
            index: 2,
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
    let volume = $state(gainNode.gain.value);
    $effect(() => {
        gainNode.gain.value = volume;
    });

    let audioElement: HTMLMediaElement | null = $state(null);
    let audioSource: MediaElementAudioSourceNode | null = $state(null);

    let currentTrackId = $state<keyof Tracks | null>(null);
    let currentTrackIndex = $derived(currentTrackId ? tracks[currentTrackId].index : 0);

    let currentTime = $state(0);

    let isPaused = $state(true);
    let isMuted = $derived(volume === 0);

    let volumeBeforeMute = $state(gainNode.gain.value);

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

    async function onplay(trackId: keyof Tracks): Promise<void> {
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

    async function onended(): Promise<void> {
        stopCurrentTrack();
        const nextTrackIndex = currentTrackIndex + 1 < trackList.length ? currentTrackIndex + 1 : 0;
        const nextTrackId = trackList[nextTrackIndex];

        return playNewTrack(nextTrackId);
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
