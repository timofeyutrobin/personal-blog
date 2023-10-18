<script lang="ts">
    import WaveSurfer from 'wavesurfer.js';
    import { onMount } from 'svelte';

    import PauseIcon from './PauseIcon.svelte';
    import PlayIcon from './PlayIcon.svelte';

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

    const audioContext = new AudioContext();

    let audioElement: HTMLMediaElement | null = null;
    let audioSource: MediaElementAudioSourceNode | null = null;
    let currentTrackId: keyof Tracks | null = null;

    let isPaused: boolean = true;
    let isPlayedOnce: boolean = false;

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

    async function handlePlayClick(trackId: keyof Tracks): Promise<void> {
        if (!isPlayedOnce) {
            isPlayedOnce = true;
        }

        if (trackId !== currentTrackId) {
            if (currentTrackId) {
                waveforms[currentTrackId]?.toggleInteraction(false);
            }

            if (audioSource && audioElement) {
                audioSource.disconnect(audioContext.destination);
                audioElement.pause();
                audioElement.fastSeek(0);
            }
            audioElement = document.querySelector<HTMLMediaElement>(`#audio-${trackId}`)!;
            audioSource = audioContext.createMediaElementSource(audioElement);
            audioSource.connect(audioContext.destination);

            await audioElement.play();

            currentTrackId = trackId;
        } else {
            if (isPaused) {
                await audioElement!.play();
            } else {
                audioElement!.pause();
            }
        }

        waveforms[currentTrackId]?.toggleInteraction(true);
        isPaused = audioElement!.paused;
    }

    function listTracks() {
        return Object.entries(tracks) as [keyof Tracks, Tracks[keyof Tracks]][];
    }

    onMount(() => {
        listTracks().forEach(([trackId]) => {
            waveforms[trackId] = WaveSurfer.create({
                container: `#waveform-${trackId}`,
                waveColor: '#4F4A85',
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
            waveforms[trackId]!.on('loading', () => {
                waveformsLoading[trackId] = true;
            });
            waveforms[trackId]!.on('ready', () => {
                waveformsLoading[trackId] = false;
            });
        });
    });
</script>

<main>
    <h1>My music</h1>

    {#each listTracks() as [trackId, track]}
        <audio id={`audio-${trackId}`} src={track.src} />
    {/each}

    <div class="track-list">
        {#each listTracks() as [trackId, track]}
            <div class="track">
                <div class="cover" style={`background-image: url(${track.cover})`}>
                    <button
                        on:click={() => handlePlayClick(trackId)}
                        class={`play-button ${trackId === currentTrackId ? 'current' : ''}`}
                    >
                        {#if (trackId === currentTrackId && isPaused) || !isPlayedOnce || trackId !== currentTrackId}
                            <PlayIcon />
                        {:else}
                            <PauseIcon />
                        {/if}
                    </button>
                </div>
                <div class="track-main-section">
                    <h2 class="title">{track.title}</h2>
                    <div class="waveform" id={`waveform-${trackId}`} />
                    {#if waveformsLoading[trackId]}
                        <div class={`waveform-loader waveform-loader-loading`}>Loading...</div>
                    {/if}
                </div>
            </div>
        {/each}
    </div>
</main>

<style lang="scss">
    @mixin active-button {
        @include default-box-shadow($shadow-alt-color);
        :global(svg) {
            color: $shadow-alt-color;
        }
    }

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
