<script lang="ts">
    import PauseIcon from './PauseIcon.svelte';
    import PlayIcon from './PlayIcon.svelte';

    const tracks = {
        interference: {
            src: '/music/interference.mp3',
            title: 'Вмешательство'
        },
        ii: {
            src: '/music/II.mp3',
            title: 'II'
        },
        radioDream: {
            src: '/music/radiodream.mp3',
            title: 'Радиомечта'
        }
    };
    type Tracks = typeof tracks;

    const audioContext = new AudioContext();

    let audioElement: HTMLMediaElement | null = null;
    let audioSource: MediaElementAudioSourceNode | null = null;
    let currentTrackId: string | null = null;

    let isPaused: boolean = true;
    let isPlayedOnce: boolean = false;

    async function handlePlayClick(trackId: keyof Tracks): Promise<void> {
        if (!isPlayedOnce) {
            isPlayedOnce = true;
        }

        if (trackId !== currentTrackId) {
            if (audioSource && audioElement) {
                audioSource.disconnect(audioContext.destination);
            }
            audioElement = new Audio(tracks[trackId].src);
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

        isPaused = audioElement!.paused;
    }

    function listTracks() {
        return Object.entries(tracks) as [keyof Tracks, Tracks[keyof Tracks]][];
    }
</script>

<main>
    <h1>My music</h1>

    {#each listTracks() as [trackId, track]}
        <article>
            <button on:click={() => handlePlayClick(trackId)} aria-label="play">
                {#if (trackId === currentTrackId && isPaused) || !isPlayedOnce || trackId !== currentTrackId}
                    <PlayIcon />
                {:else}
                    <PauseIcon />
                {/if}
            </button>
            <h2 class="title">{track.title}</h2>
        </article>
    {/each}
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

    article {
        margin-top: indent(3);
        display: flex;
        align-items: center;
    }

    button {
        cursor: pointer;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        @include default-box-shadow;
    }

    .title {
        @include heading-medium;
        margin-left: indent(2);
    }
</style>
