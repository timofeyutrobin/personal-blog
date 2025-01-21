<script lang="ts">
    let {
        value = $bindable(),
        class: className,
        min,
        max,
        step
    }: { value: number; class: string; step: number; min: number; max: number } = $props();

    let progressWidthInPercent = $derived(((value - min) / (max - min)) * 100);
</script>

<div class="relative">
    <input type="range" class={className} bind:value {min} {max} {step} />
    <div
        class="absolute top-0 left-0 h-[4px] w-full bg-indigo-600"
        style:width="{progressWidthInPercent}%"
    ></div>
</div>

<style lang="postcss">
    input {
        @apply cursor-pointer
            appearance-none
            outline-none
            h-[4px]
            [&::-moz-range-thumb]:h-[16px]
            [&::-moz-range-thumb]:w-[16px]
            [&::-moz-range-thumb]:appearance-none
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:border-none
            [&::-moz-range-thumb]:bg-indigo-600
            [&::-moz-range-thumb]:relative
            [&::-moz-range-thumb]:z-10
            [&::-moz-range-track]:-mt-[6px]
            [&::-moz-range-track]:h-[4px]
            [&::-moz-range-track]:bg-indigo-300
            [&::-webkit-slider-runnable-track]:h-[4px]
            [&::-webkit-slider-runnable-track]:bg-indigo-300
            [&::-webkit-slider-thumb]:-mt-[6px]
            [&::-webkit-slider-thumb]:h-[16px]
            [&::-webkit-slider-thumb]:w-[16px]
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:relative
            [&::-webkit-slider-thumb]:z-10
            [&::-webkit-slider-thumb]:bg-indigo-600;
    }
</style>
