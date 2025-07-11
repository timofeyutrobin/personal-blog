import { execSync } from 'child_process';
import { readFileSync, rmSync } from 'fs';

const FLOAT_NUMBER_LENGTH_BYTES = 4;
const CHUNK_COUNT = 32;

function convertToRawValues(inputFile) {
    const tempRawFile = 'temp.raw';
    try {
        execSync(`sox "${inputFile}" -c 1 -r 1 -e floating-point -L -t raw "${tempRawFile}"`);

        const buffer = readFileSync(tempRawFile);
        const values = [];
        for (let i = 0; i < buffer.length; i += FLOAT_NUMBER_LENGTH_BYTES) {
            values.push(buffer.readFloatLE(i));
        }
        return values;
    } catch (err) {
        console.error('Error processing file');
        process.exit(1);
    } finally {
        rmSync('temp.raw');
    }
}

function splitToChunks(values) {
    const chunkSize = Math.ceil(values.length / CHUNK_COUNT);
    const averages = [];
    for (let i = 0; i < CHUNK_COUNT; i++) {
        const start = i * chunkSize;
        const end = Math.min(start + chunkSize, values.length);
        if (start >= values.length) break;
        const chunk = values.slice(start, end);
        const avg = chunk.reduce((sum, v) => sum + Math.abs(v), 0) / chunk.length;
        averages.push(avg);
    }

    return averages;
}

function normalize(values) {
    const max = Math.max(...values);
    const min = Math.min(...values);
    return values.map((v) => (max === min ? 0 : (v - min) / (max - min)));
}

function compressDynamicRange(peaks, gamma = 3, minValue = 0.1) {
    return peaks.map((v) => {
        const compressed = Math.pow(v, 1 / gamma);
        return compressed * (1 - minValue) + minValue;
    });
}

const inputFile = process.argv[2];
if (!inputFile) {
    console.error('Usage: node generatePeaks.js <audio-file>');
    process.exit(1);
}

const rawValues = convertToRawValues(inputFile);
const chunks = splitToChunks(rawValues);
const normalized = normalize(chunks);
const compressed = compressDynamicRange(normalized);
console.log(compressed);
