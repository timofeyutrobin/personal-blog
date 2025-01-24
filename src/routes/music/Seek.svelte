<script lang="ts">
    let {
        currentTime,
        class: className,
        totalTime,
        disabled,
        peaks,
        onseek
    }: {
        currentTime: number;
        class?: string;
        totalTime: number;
        disabled?: boolean;
        peaks: number[];
        onseek: (value: number) => void;
    } = $props();

    let progressWidthInPercent = $derived((currentTime / totalTime) * 100);
</script>

<div class="{className} relative bg-transparent">
    <input
        {disabled}
        type="range"
        value={currentTime}
        oninput={(event) => onseek(Number(event.currentTarget.value))}
        min={0}
        max={totalTime}
        step={1}
    />
    <div class="absolute top-0 left-0 h-[32px] w-full flex items-end gap-[1px] pointer-events-none">
        {#each peaks as peak}
            <div style:height="{peak * 32}px" class="w-full bg-indigo-300 dark:bg-indigo-900"></div>
        {/each}
    </div>
    <div
        class="absolute bottom-0 left-0 h-[4px] bg-indigo-600 w-full pointer-events-none"
        style:width="{progressWidthInPercent}%"
    ></div>
</div>

<style lang="postcss">
    input {
        @apply block
            cursor-pointer
            disabled:cursor-default
            appearance-none
            outline-none
            h-[32px]
            w-full
            bg-transparent

            [&::-moz-range-thumb]:h-[32px]
            [&::-moz-range-thumb]:w-[4px]
            [&::-moz-range-thumb]:appearance-none
            [&::-moz-range-thumb]:rounded-none
            [&::-moz-range-thumb]:border-none
            [&::-moz-range-thumb]:relative
            [&::-moz-range-thumb]:z-10
            [&::-moz-range-thumb]:bg-indigo-600

            [&::-moz-range-track]:h-[32px]
            [&::-moz-range-track]:bg-transparent

            [&::-webkit-slider-thumb]:h-[32px]
            [&::-webkit-slider-thumb]:w-[4px]
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:rounded-none
            [&::-webkit-slider-thumb]:relative
            [&::-webkit-slider-thumb]:z-10
            [&::-webkit-slider-thumb]:bg-indigo-600

            [&::-webkit-slider-runnable-track]:h-[32px]
            [&::-webkit-slider-runnable-track]:bg-transparent;
    }
</style>
