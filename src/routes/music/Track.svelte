<script lang="ts" generics="T extends string">
    import PauseIcon from './icons/PauseIcon.svelte';
    import PlayIcon from './icons/PlayIcon.svelte';
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

<div class="flex items-center py-4">
    <div
        class="relative h-[50px] w-[50px] shrink-0 rounded-full sm:h-[200px] sm:w-[200px] sm:rounded-none"
    >
        <img src={cover} alt="Track cover" class="absolute hidden h-full w-full sm:block" />
        {#if isCurrent}
            <div class="absolute bottom-2 left-2 hidden sm:block">
                <Bars isPlaying={!isPaused} />
            </div>
        {/if}
        <button
            onclick={() => onplay(id)}
            class="group absolute bottom-0 right-0 flex h-[50px] w-[50px] rounded-full bg-white shadow shadow-indigo-100 transition-shadow hover:shadow-indigo-300 focus:shadow-indigo-300 active:shadow-indigo-300 disabled:shadow-indigo-100 sm:bottom-2 sm:right-2 sm:shadow-current sm:disabled:shadow-current {isCurrent
                ? 'shadow-indigo-300'
                : ''}"
            disabled={isWaveformLoading}
        >
            {#if (isCurrent && isPaused) || !isCurrent}
                <PlayIcon
                    class="m-auto h-[36px] w-[36px] transition-colors group-hover:fill-indigo-600 group-focus:fill-indigo-600 group-active:fill-indigo-600 group-disabled:fill-current {isCurrent
                        ? 'fill-indigo-600'
                        : ''}"
                />
            {:else}
                <PauseIcon
                    class="m-auto h-[36px] w-[36px] transition-colors group-hover:fill-indigo-600 group-focus:fill-indigo-600 group-active:fill-indigo-600 {isCurrent
                        ? 'fill-indigo-600'
                        : ''}"
                />
            {/if}
        </button>
    </div>
    <div class="ml-4 w-[300px] shrink">
        <h2 class="text-xl">{title}</h2>
        <div class="mt-4 h-[32px] w-full cursor-pointer" id="waveform-{id}"></div>
        {#if isWaveformLoading}
            <div class="-mt-[32px] flex h-[32px] w-full flex-col justify-around">
                <div class="w-full"></div>
            </div>
        {/if}
        <div class="flex w-full justify-between">
            <span class="text-sm">{currentTimeDisplay}</span>
            <span class="text-sm">{totalTime}</span>
        </div>
    </div>
</div>
