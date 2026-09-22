// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { PostMetadata } from '$lib/types/posts';

// and what to do when importing types
declare namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface Platform {}
}

declare module '*.md' {
    import type { SvelteComponent } from 'svelte';

    export default class Comp extends SvelteComponent {}

    export const metadata: PostMetadata;
}
