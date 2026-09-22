export enum PostType {
    MINI = 'MINI',
    FULL = 'FULL'
}

export interface PostMetadata {
    type: PostType;
    title: string;
    description?: string;
    created: string;
    cover: string;
    alt: string;
}
