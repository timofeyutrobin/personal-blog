import adapter from '@sveltejs/adapter-vercel';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

/** @type {import('vite').UserConfig} */
export default defineConfig({
    plugins: [
        tailwindcss(),
        sveltekit({
            adapter: adapter({
                runtime: 'nodejs22.x'
            })
        })
    ]
});
