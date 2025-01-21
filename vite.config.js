import { sveltekit } from '@sveltejs/kit/vite';
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from './tailwind.config';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	define: {
		tailwindConfig: resolveConfig(tailwindConfig),
	}
};

export default config;
