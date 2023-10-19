<script lang="ts">
    import WaveSurfer from 'wavesurfer.js';
    import { onMount } from 'svelte';
    import Track from './Track.svelte';

    const tracks = {
        interference: {
            src: '/music/interference.mp3',
            title: 'Вмешательство',
            cover: '/images/covers/interference_cover.jpeg'
        },
        ii: {
            src: '/music/II.mp3',
            title: 'II',
            cover: '/images/covers/ii_cover.jpeg'
        },
        radioDream: {
            src: '/music/radiodream.mp3',
            title: 'Радиомечта',
            cover: '/images/covers/radiodream_cover.jpeg'
        }
    };
    type Tracks = typeof tracks;
    const trackList = Object.keys(tracks) as (keyof Tracks)[];

    const audioContext = new AudioContext();

    let audioElement: HTMLMediaElement | null = null;
    let audioSource: MediaElementAudioSourceNode | null = null;
    let currentTrackId: keyof Tracks | null = null;
    let currentTrackIndex: number = -1;

    let isPaused: boolean = true;
    let isMusicOpen: boolean = false;

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
        audioSource.connect(audioContext.destination);

        await audioElement.play();

        currentTrackId = trackId;
        currentTrackIndex = trackList.findIndex((id) => currentTrackId === id);
        waveforms[currentTrackId]?.toggleInteraction(true);
    }

    async function stopCurrentTrack(): Promise<void> {
        if (!currentTrackId || !audioSource || !audioElement) {
            return;
        }
        waveforms[currentTrackId]?.toggleInteraction(false);
        audioSource.disconnect(audioContext.destination);
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

    async function onTrackEnd() {
        stopCurrentTrack();
        const newTrackIndex = currentTrackIndex + 1 < trackList.length ? currentTrackIndex + 1 : 0;
        const nextTrackId = trackList[newTrackIndex];

        await playNewTrack(nextTrackId);
    }

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
    {#each trackList as trackId}
        <audio id={`audio-${trackId}`} src={tracks[trackId].src} on:ended={onTrackEnd} />
    {/each}

    <h1>My music</h1>
    <div class="track-list">
        {#each trackList as trackId}
            <Track
                id={trackId}
                title={tracks[trackId].title}
                cover={tracks[trackId].cover}
                isCurrent={trackId === currentTrackId}
                {isMusicOpen}
                isWaveformLoading={waveformsLoading[trackId]}
                {isPaused}
                {handlePlayClick}
            />
        {/each}
    </div>
</main>

<style lang="scss">
    main {
        @include content-wrapper;
        @include sheet;

        margin: indent(4) auto;
    }

    h1 {
        @include heading-large;
    }

    .track-list {
        margin-top: indent(2);
    }
</style>
