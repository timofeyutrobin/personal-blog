<script lang="ts">
    import WaveSurfer from 'wavesurfer.js';
    import { throttle } from 'throttle-debounce';
    import { onMount } from 'svelte';
    import Track from './Track.svelte';
    import UnmuteIcon from './icons/UnmuteIcon.svelte';
    import MuteIcon from './icons/MuteIcon.svelte';
    import Slider from './Slider.svelte';
    import { tracks, type TrackId } from './tracks';

    const trackList = Object.keys(tracks) as TrackId[];

    let audioElements = $state<Record<string, HTMLMediaElement>>();
    let volume = $state(1);
    $effect(() => {
        if (audioElements) {
            Object.values(audioElements).forEach((audio) => (audio.volume = volume));
        }
    });

    let currentTrackId = $state<TrackId | null>(null);
    let currentTrackIndex = $derived(currentTrackId ? tracks[currentTrackId].index : 0);

    let currentTime = $state(0);

    let isPaused = $state(true);
    let isMuted = $derived(volume === 0);

    let volumeBeforeMute = $state(1);

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
        await audioElements![trackId].play();

        currentTrackId = trackId;
        waveforms[currentTrackId]?.toggleInteraction(true);
    }

    async function stop(): Promise<void> {
        if (!currentTrackId) {
            return;
        }
        currentTime = 0;
        waveforms[currentTrackId]?.toggleInteraction(false);

        const audioElement = audioElements![currentTrackId];

        audioElement.pause();
        audioElement.currentTime = 0;
    }

    function pause(): void {
        audioElements![currentTrackId!].pause();
    }

    async function resume(): Promise<void> {
        return audioElements![currentTrackId!].play();
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

        isPaused = audioElements![currentTrackId!].paused;
    }

    async function onended(): Promise<void> {
        stop();
        const nextTrackIndex = currentTrackIndex + 1 < trackList.length ? currentTrackIndex + 1 : 0;
        const nextTrackId = trackList[nextTrackIndex];

        return playNew(nextTrackId);
    }

    const ontimeupdate = throttle(1000, (event: Event) => {
        currentTime = (event.target as HTMLAudioElement).currentTime;
    });

    onMount(() => {
        audioElements = trackList.reduce<Record<string, HTMLMediaElement>>((elements, trackId) => {
            elements[trackId] = document.querySelector<HTMLMediaElement>(`#audio-${trackId}`)!;
            return elements;
        }, {});
        trackList.forEach((trackId) => {
            const waveform = WaveSurfer.create({
                container: `#waveform-${trackId}`,
                waveColor: '#a5b4fc',
                progressColor: '#3730a3',
                media: document.querySelector<HTMLMediaElement>(`#audio-${trackId}`)!,
                barWidth: 4,
                height: 'auto',
                normalize: true,
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

<svelte:head>
    <title>Timofey Utrobin - music</title>
</svelte:head>

<main
    class="
        container relative
        mx-auto mb-8 max-w-full p-6
        shadow shadow-zinc-300
        sm:my-4 md:w-9/12 xl:w-7/12
        dark:shadow-none dark:bg-zinc-800
    "
>
    <h1 class="mb-2 text-3xl">My music</h1>
    <div class="absolute right-6 top-6 flex items-center">
        <button
            role="switch"
            aria-label="mute"
            aria-checked={isMuted}
            class="
                h-8 w-8 mr-2
                rounded-full p-1 outline-none transition-colors
                hover:bg-indigo-50 focus:bg-indigo-50 active:bg-indigo-50
                dark:hover:bg-indigo-800 dark:focus:bg-indigo-800 dark:active:bg-indigo-800"
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
                <UnmuteIcon class="fill-current" />
            {:else}
                <MuteIcon class="fill-current" />
            {/if}
        </button>
        <Slider class="hidden w-[150px] sm:block" step={0.05} min={0} max={1} bind:value={volume} />
    </div>
    <div class="flex flex-col items-center sm:block">
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
