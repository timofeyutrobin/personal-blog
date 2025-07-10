import {
    SUPABASE_STORAGE_PHOTOS_URL,
    SUPABASE_STORAGE_COVERS_URL,
    SUPABASE_STORAGE_SITE_URL,
    SUPABASE_STORAGE_MUSIC_URL
} from '$env/static/private';

export async function load() {
    return {
        photosUrlPrefix: SUPABASE_STORAGE_PHOTOS_URL,
        coversUrlPrefix: SUPABASE_STORAGE_COVERS_URL,
        siteImagesUrlPrefix: SUPABASE_STORAGE_SITE_URL,
        musicUrlPrefix: SUPABASE_STORAGE_MUSIC_URL
    };
}

// sox II.mp3 -c 1 -r 1 -e floating-point -t raw sample
