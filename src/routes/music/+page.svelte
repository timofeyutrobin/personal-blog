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
            if (audioSource) {
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

    <div class="track-list">
        {#each listTracks() as [trackId, track]}
            <div
                class="track"
                role="button"
                tabindex={0}
                aria-label="play"
                on:click={() => handlePlayClick(trackId)}
                on:keydown={(event) => event.key === 'Enter' && handlePlayClick(trackId)}
            >
                <i class={`play-icon ${trackId === currentTrackId ? 'current' : ''}`}>
                    {#if (trackId === currentTrackId && isPaused) || !isPlayedOnce || trackId !== currentTrackId}
                        <PlayIcon />
                    {:else}
                        <PauseIcon />
                    {/if}
                </i>
                <h2 class="title">{track.title}</h2>
            </div>
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

    @mixin active-icon {
        @include default-box-shadow($shadow-alt-color);
        :global(svg) {
            color: $shadow-alt-color;
        }
    }

    .play-icon {
        cursor: pointer;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        background-color: $main-background-color;
        @include default-box-shadow;
        @include transition(box-shadow);
        display: flex;

        &.current {
            @include active-icon;
        }

        :global(svg) {
            width: 36px;
            height: 36px;
            margin: auto;
            @include transition(color);
        }
    }

    .track {
        display: flex;
        align-items: center;

        padding: indent(2) indent(1);

        cursor: pointer;

        @include transition(background-color);

        &:hover,
        &:focus {
            background-color: $hover-background-color;

            .play-icon {
                @include active-icon;
            }
        }
    }

    .title {
        @include heading-medium;
        margin-left: indent(2);
    }
</style>
