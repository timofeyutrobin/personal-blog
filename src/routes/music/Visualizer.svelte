<script lang="ts">
    import { onMount } from 'svelte';

    export let analyser: AnalyserNode;
    export let width: number;
    export let height: number;

    const bufferLength = analyser.frequencyBinCount;

    const dataArray = new Uint8Array(bufferLength);

    let canvas: HTMLCanvasElement;

    onMount(() => {
        const canvasCtx = canvas.getContext('2d')!;

        function draw() {
            requestAnimationFrame(draw);

            analyser.getByteFrequencyData(dataArray);
            canvasCtx.clearRect(0, 0, width, height);

            const barWidth = (width / bufferLength) * 2;
            let barHeight;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                barHeight = (dataArray[i] / 255) * height * 2;

                canvasCtx.fillStyle = 'rgba(255, 255, 255, 0.3)';
                canvasCtx.fillRect(x, height - barHeight / 2, barWidth, barHeight / 2);

                x += barWidth;
            }
        }
        draw();
    });
</script>

<canvas {width} {height} bind:this={canvas}>Visualizer</canvas>
