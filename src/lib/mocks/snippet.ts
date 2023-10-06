import type { Image, UUID } from '$lib/types/common';

export interface IPostSnippet {
    id: UUID;
    title: string;
    description: string;
    image?: Image;
}

export interface IPost {
    id: UUID;
    title: string;
    html: string;
}

const testPostId = crypto.randomUUID();

export const postSnippets: IPostSnippet[] = [
    {
        id: testPostId,
        title: 'Яблоко',
        description: 'Просто сфотографировал яблоко в саду',
        image: {
            link: '/images/apple.jpeg',
            alt: 'Apple'
        },
    }
];

export const posts: IPost[] = [
    {
        id: testPostId,
        title: 'Яблоко',
        html: `
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque rutrum dui magna, cursus scelerisque ante auctor non. Maecenas elementum ante magna, ut hendrerit ex suscipit at. Quisque suscipit iaculis ante vel pharetra. Nulla ut turpis odio. Etiam ut neque non elit sagittis egestas. Etiam ultricies nunc ac lectus hendrerit dictum. Proin sit amet tincidunt orci.</p>
            <p>Aenean dapibus interdum pellentesque. Vestibulum interdum lacus non mauris ultrices pretium. Sed interdum ultrices sapien, vitae gravida est. Curabitur eget mi aliquam, tempor eros sit amet, placerat dui. Ut congue erat sit amet dignissim maximus. Phasellus et felis hendrerit, maximus turpis vel, varius nulla. Nullam leo mi, bibendum ut fermentum ut, cursus et lectus. Curabitur sagittis, lacus vel tincidunt auctor, sem orci porta orci, eu posuere ante urna ut ex.</p>
            <img src="/images/apple.jpeg" alt="Apple"/>
            <p>Vestibulum euismod finibus velit, semper efficitur magna laoreet nec. Suspendisse potenti. Pellentesque eu nunc sed est tempus luctus. Nunc porttitor sapien sodales, elementum nisl egestas, semper dui. Phasellus sodales arcu elit. Vestibulum facilisis orci metus, ac dapibus tortor condimentum nec. Vivamus consectetur est in purus faucibus finibus. Pellentesque euismod nisl pellentesque vulputate pellentesque. Cras eget nibh erat. Nunc tempor, risus ac feugiat elementum, justo lorem auctor urna, vitae fringilla eros felis ut ligula. Phasellus ut orci ac erat feugiat varius vulputate sit amet mi. Vestibulum eget semper urna.</p>
            <p>Suspendisse potenti. Suspendisse vulputate felis in diam vehicula mattis eu eu enim. In iaculis quis arcu tempor porttitor. Phasellus leo sapien, pharetra sed mauris quis, tincidunt fermentum quam. Integer ut erat sapien. Mauris eget diam quis orci interdum ultricies. Suspendisse varius ligula eu lorem egestas posuere. Vestibulum sed mollis ligula. Fusce eleifend, enim luctus laoreet pretium, elit risus venenatis odio, a pellentesque leo dui non urna. Pellentesque hendrerit libero eget purus rutrum, nec iaculis dui congue. Donec mi nibh, pulvinar sit amet metus in, tempor venenatis odio. Ut rutrum mauris a eros pulvinar, aliquet malesuada sem tincidunt.</p>
            <p>Vivamus ut nisi risus. Etiam tincidunt justo vitae mi auctor, ac dapibus dolor aliquet. Nunc convallis sapien sed sagittis consectetur. Suspendisse quis libero quam. Quisque est massa, pharetra sit amet eros eu, mollis vestibulum erat. Integer lacinia facilisis metus, et tristique enim dignissim vitae. Integer elit nisl, facilisis a lectus eget, suscipit lacinia diam. Sed in mi vel dui congue efficitur. Nulla pharetra bibendum nunc vitae tristique. Sed in purus pulvinar, malesuada nibh eget, consequat lacus.</p>
        `
    }
];
