import type { Image, UUID } from '$lib/types/common';

export interface IPostSnippet {
    id: UUID;
    title: string;
    description: string;
    link: string;
    image?: Image;
}

export const postSnippets: IPostSnippet[] = [
    {
        id: crypto.randomUUID(),
        title: 'Яблоко',
        description: 'Просто сфотографировал яблоко в саду',
        link: '/post/test',
        image: {
            link: '/images/apple.jpeg',
            alt: 'Apple'
        }
    }
];
