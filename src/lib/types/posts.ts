export enum PostType {
    MINI,
    FULL
}

export interface PostSnippetModel {
    id: number;
    type: PostType;
    title: string;
    description: string | null;
    slug: string | null;
    date: string | null;
    cover: {
        src: string;
        alt: string;
    } | null;
}

export interface PostModel extends PostSnippetModel {
    html: string;
}
