<script lang="ts">
    import PauseIcon from './icons/PauseIcon.svelte';
    import PlayIcon from './icons/PlayIcon.svelte';
    import Bars from './Bars.svelte';
    import Seek from './Seek.svelte';
    import SpinnerIcon from './icons/SpinnerIcon.svelte';
    import { getContext } from 'svelte';

    interface Props {
        id: string;
        title: string;
        cover: string;
        currentTime: number;
        totalTime: number;
        isCurrent: boolean;
        isPaused: boolean;
        peaks: number[];
        isLoading: boolean;
        disabled?: boolean;
        onplay: (id: string) => Promise<void>;
        onseek: (time: number) => void;
    }
    let {
        id,
        title,
        cover,
        currentTime,
        totalTime,
        isCurrent,
        isPaused,
        peaks,
        isLoading,
        disabled,
        onplay,
        onseek
    }: Props = $props();
    const coversUrlPrefix = getContext('coversUrlPrefix');

    const formatTime = (time: number): string => {
        if (!time) {
            return '0:00';
        } else {
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time) % 60;
            return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        }
    };

    const currentTimeDisplay = $derived(formatTime(isCurrent ? currentTime : 0));
    const totalTimeDisplay = formatTime(totalTime);
</script>

<div class="flex w-full items-center py-4">
    <div
        class="relative h-[50px] w-[50px] shrink-0 rounded-full sm:h-[200px] sm:w-[200px] sm:rounded-none"
    >
        <img
            src="{coversUrlPrefix}/{cover}"
            alt="Track cover"
            class="absolute hidden h-full w-full sm:block"
        />
        {#if isCurrent}
            <div class="absolute bottom-2 left-2 hidden sm:block">
                <Bars isPlaying={!isPaused} />
            </div>
        {/if}
        <button
            disabled={isLoading || disabled}
            onclick={() => !isLoading && onplay(id)}
            class="
                group
                absolute bottom-0 right-0
                flex
                h-[50px] w-[50px]
                rounded-full bg-white shadow shadow-indigo-100 transition-shadow
                hover:shadow-indigo-300 focus:shadow-indigo-300 active:shadow-indigo-300
                disabled:shadow-indigo-100
                sm:bottom-2 sm:right-2
                sm:shadow-current sm:disabled:shadow-current
                dark:bg-zinc-900
                dark:shadow-none
                dark:border
                dark:border-zinc-500
                {isCurrent ? 'shadow-indigo-300' : ''}
            "
        >
            {#if isLoading}
                <SpinnerIcon
                    class="
                        animate-spin
                        m-auto h-[36px] w-[36px]
                        stroke-current
                    "
                />
            {:else if (isCurrent && isPaused) || !isCurrent}
                <PlayIcon
                    class="
                        m-auto h-[36px] w-[36px]
                        transition-colors
                        fill-current
                        group-hover:fill-indigo-600 group-focus:fill-indigo-600 group-active:fill-indigo-600
                        dark:group-hover:fill-indigo-400 dark:group-focus:fill-indigo-400 dark:group-active:fill-indigo-400
                        group-disabled:fill-current group-disabled:group-hover:fill-current group-disabled:group-focus:fill-current group-disabled:group-active:fill-current
                        {isCurrent ? 'fill-indigo-600 dark:fill-indigo-400' : ''}
                    "
                />
            {:else}
                <PauseIcon
                    class="
                        m-auto h-[36px] w-[36px]
                        transition-colors
                        fill-current
                        group-hover:fill-indigo-600 group-focus:fill-indigo-600 group-active:fill-indigo-600
                        dark:group-hover:fill-indigo-400 dark:group-focus:fill-indigo-400 dark:group-active:fill-indigo-400
                        {isCurrent ? 'fill-indigo-600 dark:fill-indigo-400' : ''}
                    "
                />
            {/if}
        </button>
    </div>
    <div class="ml-4 basis-[300px]">
        <h2 class="text-xl">{title}</h2>
        <div class="h-[48px] w-full mt-4">
            {#if totalTime}
                <Seek
                    {totalTime}
                    {onseek}
                    {peaks}
                    currentTime={isCurrent ? currentTime : 0}
                    disabled={!isCurrent}
                />
            {/if}
        </div>
        <div class="flex w-full justify-between">
            <span class="text-sm">{currentTimeDisplay}</span>
            <span class="text-sm">{totalTimeDisplay}</span>
        </div>
    </div>
</div>
