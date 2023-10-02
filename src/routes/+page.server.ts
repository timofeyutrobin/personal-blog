import { postSnippets, type IPostSnippet } from '$lib/mocks/snippet';

export interface Data {
    posts: IPostSnippet[];
}

export function load(): Data {
    return {
        posts: postSnippets
    };
}
