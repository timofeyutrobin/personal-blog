export interface Track {
    index: number;
    src: string;
    title: string;
    cover: string;
    duration: string;
}

export const tracks: Record<string, Track> = {
    interference: {
        index: 0,
        src: '/music/interference.mp3',
        title: 'Вмешательство',
        cover: '/images/covers/interference_cover.jpeg',
        duration: '6:18'
    },
    ii: {
        index: 1,
        src: '/music/II.mp3',
        title: 'II',
        cover: '/images/covers/ii_cover.jpeg',
        duration: '4:35'
    },
    radioDream: {
        index: 2,
        src: '/music/radiodream.mp3',
        title: 'Радиомечта',
        cover: '/images/covers/radiodream_cover.jpeg',
        duration: '7:53'
    }
};

export type Tracks = typeof tracks;
export type TrackId = keyof Tracks;
